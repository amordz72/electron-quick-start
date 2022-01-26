<?php
include 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$connect = new PDO("mysql:host=$host;dbname=$database", "$username", "$password");
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
if ($received_data->action == 'login') {

    try {
        $data  = array(
            ':usName' => $received_data->user,
            ':usPw' => $received_data->password,
        );
        $user = $received_data->user;
        $query = "select usName,usPw,tyNum from users where  usName=:usName and usPw=:usPw";
        $statement = $connect->prepare($query);
        $statement->execute($data);
        $c = 0;
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

            $data[] = $row;
            $c++;
        }
        if ($c === 1) {
            $dataLogin  = array(
                'user' =>  $data[0]['usName'],
                'pw' =>    $data[0]['usPw'],
                'type' =>    $data[0]['tyNum'],
                'msg' =>   '1',
            );
            echo json_encode($dataLogin);
        } else {
            $output = array('msg' => "0");
            echo json_encode($output);
        }
    } catch (\Throwable $th) {
        $output = array('message' => $th);
        echo json_encode($output);
    }
}
if ($received_data->action == 'createDb') {

    try {
        $cr_project = "CREATE TABLE  IF NOT EXISTS  project 
        ( `prId` INT NOT NULL AUTO_INCREMENT , `prName` VARCHAR(255) NOT NULL unique,
         `dtEnter` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`prId`)) ENGINE = InnoDB; ";

        $statement = $connect->prepare($cr_project);
        $result =  $statement->execute();

        $cr_code_tables = "CREATE TABLE  IF NOT EXISTS  `code_tables` (
        `coId` int(11) NOT NULL primary key AUTO_INCREMENT,
        `taName` varchar(255) NOT NULL,
        `prName`varchar(255) NOT NULL, 
        `laName` varchar(255) NOT NULL,
         `coText` text NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8;";

        $cr_table_cols = "CREATE TABLE IF NOT EXISTS   table_cols (
            id int(11) not null auto_increment,
            col_name varchar(255) NOT NULL,
            	type varchar(255) NOT NULL,  
                col_sel  tinyint(1) NOT NULL,	
           col_if	 tinyint(1) NOT NULL,
            caption varchar(255) NOT NULL, 
                  col_control varchar(255) NOT NULL,
           tableParent varchar(255) NOT NULL,  
            tableFk varchar(255) NOT NULL,
            fk_id varchar(255) NOT NULL,
                fk_text varchar(255) NOT NULL,
            prName  varchar(255) NOT NULL ,
            PRIMARY KEY ( id )) ENGINE = InnoDB;";

        $statement = $connect->prepare($cr_table_cols);
        $result =  $statement->execute();



        $statement = $connect->prepare($cr_code_tables);
        $result =  $statement->execute();

        $output = array('msg' => 'Table Created');
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


