<?php
include 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');




$connect = new PDO("mysql:host=$host;dbname=webdb", "root", "");
$data = array();
$received_data = json_decode(file_get_contents("php://input"));

if ($received_data->action == 'getTables') {
    $data  = array(
        ':db' => $received_data->_db,
    );
    // ':table' => $received_data->table,
    $query = "SELECT table_name FROM information_schema.tables  WHERE table_schema =:db";

    $statement = $connect->prepare($query);
    $statement->execute($data);
    $data = null;
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}
 
if ($received_data->action == 'getCols') {

    $query = "SHOW FIELDS  FROM " . $received_data->_db . "." . $received_data->table;

    $statement = $connect->prepare($query);
    $statement->execute();
    $data = null;
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}
if ($received_data->action == 'fk') {
    $query = "
    SELECT 
    TABLE_NAME,COLUMN_NAME,CONSTRAINT_NAME, REFERENCED_TABLE_NAME,REFERENCED_COLUMN_NAME
  FROM
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
  WHERE
    REFERENCED_TABLE_SCHEMA = '$database' AND
    REFERENCED_TABLE_NAME = 'acounts' and TABLE_NAME='users'";
    $statement = $connect->prepare($query);
    $statement->execute();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}
if ($received_data->action == 'createTable') {

    try {
        $query = $received_data->sql;
        $statement = $connect->prepare($query);
        $result =  $statement->execute();

        $output = array('message' => 'Table created');
        echo json_encode($output);
    } catch (\Throwable $th) {
        $output = array('message' => $th);
        echo json_encode($output);
    }
}
 
 
if ($received_data->action == 'saveToDb') {

    try {



        $data2 = array(

            ':taName' => $received_data->_taName . trim(''),
            ':prName' => $received_data->_prName . trim(''),
            ':laName' => $received_data->_laName . trim(''),
            ':coText' => $received_data->_coText . trim(''),
        );
        $query = "INSERT INTO code_tables ( taName,prName,laName,coText) 
            VALUES ( :taName,:prName,:laName,:coText )";
        $statement = $connect->prepare($query);
        $statement->execute($data2);


        $output = array('msg' => 'save To Db');
        echo json_encode($output);
    } catch (\Throwable $th) {
        $output = array('message' => $th);
        echo json_encode($output);
    }
}
if ($received_data->action == 'i_project') {
    $data = array(
        ':prName' => $received_data->projectFormName,

    );
    $query = "INSERT INTO project (prName) VALUES (:prName)";
    $statement = $connect->prepare($query);
    $statement->execute($data);
}

if ($received_data->action == 'd_project') {

    try {

        $data = array(
            ':prName' => $received_data->projectFormName . trim(''),

        );
        $query = "delete from project where prName=:prName";
        $statement = $connect->prepare($query);
        $statement->execute($data);

        $query = "delete from code_tables where prName=:prName";
        $statement = $connect->prepare($query);
        $statement->execute($data);

        $output = array('msg' => "project " . $received_data->projectFormName . " deleted ");
        echo json_encode($output);
    } catch (\Throwable $th) {
        $output = array('message' => $th);
        echo json_encode($output);
    }
}
if ($received_data->action == 'getDataFromDb') {
    try {

        $query =
            "select coId,prName,taName,laName,coText from code_tables where taName='" . $received_data->tableName . "'
         
         ";
        $statement = $connect->prepare($query);
        $statement->execute();
        $result = array();
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        echo json_encode($result);
    } catch (\Throwable $th) {
        /* */
        $output = array('message' => $th);
        echo json_encode($output);
    }
}
if ($received_data->action == 'i_table_cols') {
    $data = array(
        ':col_name' => $received_data->_col_name,
        ':type' => $received_data->_type,
        ':col_sel' => $received_data->_col_sel,
        ':col_if' => $received_data->_col_if,
        ':caption' => $received_data->_caption,
        ':col_control' => $received_data->_col_control,
        ':tableFk' => $received_data->_tableFk,
        ':fk_id' => $received_data->_fk_id,
        ':fk_text' => $received_data->_fk_text,
        ':prName' => $received_data->_prName,
        ':tableParent' => $received_data->_tableParent,
    );
    $query = "INSERT INTO table_cols (col_name,type,col_sel,col_if,caption,col_control,tableParent,tableFk,fk_id,fk_text,prName) 
    VALUES (:col_name,:type,:col_sel,:col_if,:caption,:col_control,:tableParent,:tableFk,:fk_id,:fk_text,:prName )";
    $statement = $connect->prepare($query);
    $statement->execute($data);
    $output = array('message' => 'Data Inserted');
    echo json_encode($output);
}
if ($received_data->action == 'g_table_cols') {
    $query = " SELECT * FROM table_cols ";
    


    $statement = $connect->prepare($query);
    $statement->execute();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}
if ($received_data->action == 'GetDataById_table_cols') {
    $data = array(
          ':tableParent' => $received_data->_tableParent
       // ':prName' => $received_data->_prName, and prName =:prName;
     
    );
    $query = " SELECT * FROM table_cols where tableParent=:tableParent";
    $result = array();

    $statement = $connect->prepare($query);
    $statement->execute( $data);
   
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $result[] = $row;
    }
    echo json_encode($result);
}

if ($received_data->action == 'all') {
    
  $query = "SELECT * from laravel_code";

    $statement = $connect->prepare($query);
    $statement->execute();
    $data = null;
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}
if ($received_data->action == 'i_code') {
     $data = array(
        ':code_title' => $received_data->code_title,
        ':code_body' => $received_data->code_body,
        ':code_des' => $received_data->code_des,

    );
    $query = "INSERT INTO laravel_code (code_title,code_body,code_des) 
    VALUES (:code_title,:code_body,:code_des)";
    $statement = $connect->prepare($query);
    $statement->execute($data); 
      $output = array('msg' => "ok" );
        echo json_encode($output);
}
