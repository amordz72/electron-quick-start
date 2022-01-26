<?php

$username="root";
$password="";
$host="localhost";
$database="mahal";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$connect = new PDO("mysql:host=$host;dbname=$database", "$username", "$password");
$data = array();
$received_data = json_decode(file_get_contents("php://input"));


$table_types = 'types';
$ORDER_types  = 'ORDER BY tyId DESC';
$cols_add_types = 'tyId,tyName';
$par_add_types = ':tyId,:tyName';
$cols_update_types = 'SET tyName = :tyName';
$col_id_types = 'tyId';
 
if ($received_data->action == 'add_all_types') {
  $data = array(
    ':tyId' => $received_data->_all[0],
    ':tyName' => $received_data->_all[1],
  );
  $query = "INSERT INTO  $table_types ($cols_add_types) VALUES ($par_add_types )";
  $statement = $connect->prepare($query);
  $statement->execute($data);
  $output = array('message' => 'Data Inserted');
  echo json_encode($output);
}

if ($received_data->action == 'GetDataById_types') {
  $query = " SELECT tyId,tyName FROM  $table_types  
 and tyId= ' $received_data->_tyId '  ORDER BY tyId DESC";
  //  $query = " SELECT types.tyId,types.tyName FROM  types  wh  
  // and   $col_id_types= ' $received_data->_tyId '  $ORDER_types"; 
  $statement = $connect->prepare($query);
  $statement->execute();
  while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
  }
  echo json_encode($data);
}
if ($received_data->action == 'i_types') {
  $data = array(
    ':tyId' => $received_data->_tyId,
    ':tyName' => $received_data->_tyName,
  );
  $query = "INSERT INTO  $table_types ($cols_add_types) VALUES ($par_add_types )";
  $statement = $connect->prepare($query);
  $statement->execute($data);
  $output = array('message' => 'Data Inserted');
  echo json_encode($output);
}
if ($received_data->action == 's_types') {
  $query = " SELECT * FROM $table_types 
  WHERE $col_id_types= '" . $received_data->_tyId . "'";
  $statement = $connect->prepare($query);
  $statement->execute();
  $result = $statement->fetchAll();
  foreach ($result as $row) {
    $data['tyId'] = $row['tyId'];
    $data['tyName'] = $row['tyName'];
    $data['tyId'] = $row['tyId'];
  }
  echo json_encode($data);
}
if ($received_data->action == 'u_types') {
  $data = array(
    ':tyName' => $received_data->_tyName,
    ':tyId'   => $received_data->hiddenId
  );

  $query = " UPDATE $table_types $cols_update_types WHERE  tyId = :tyId ";


  $statement = $connect->prepare($query);
  $statement->execute($data);
  $output = array('message' => 'Data Updated');
  echo json_encode($output);
}
if ($received_data->action == 'd_types') {
  $query = "
 DELETE FROM $table_types  WHERE $col_id_types= '" . $received_data->_tyId . "'";
  $statement = $connect->prepare($query);
  $statement->execute();
  $output = array(
    'message' => 'Data Deleted'
  );
  echo json_encode($output);
}
if ($received_data->action == 'max_types') {
  $max_id = 1;
  $stmt =  $connect->prepare("SELECT MAX($col_id_types)+1 AS max_id FROM $table_types");
  $stmt->execute();
  $invNum = $stmt->fetch(PDO::FETCH_ASSOC);
  $max_id = $invNum['max_id'];
  if (empty($max_id) || $max_id == '') {
    $max_id = 1;
  }
  $data[$col_id_types] = $max_id;
  echo json_encode($data);
}

if($received_data->action == 'fill_cbxName')
{
 $query = " SELECT * FROM tablename ";
  
 $statement = $connect->prepare($query);
 $statement->execute();
 $result = $statement->fetchAll();
 foreach($result as $row)
 {
  $data['usID'] = $row['usID'];
  $data['usName'] = $row['usName'];
 
 }
 echo json_encode($data);
}

?>
 