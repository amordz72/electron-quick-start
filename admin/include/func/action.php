<?php
include 'include/func/config.php';

$connect = new PDO("mysql:host=$host;dbname=$db_ser", "$us_ser", "$pw_ser"); 
  $received_data = json_decode(file_get_contents("php://input"));
$table_users ='users';
$ORDER_users  ='ORDER BY usID DESC';
$cols_add_users ='usID,usName,usPw';
$par_add_users=':usID,:usName,:usPw';
$cols_update_users ='SET usName = :usName,usPw = :usPw';   
$col_id_users ='usID';


$data = array();
if($received_data->action == 'add_all_users')
{
  $data = array(
    ':usID' => $received_data->_all[0]  ,
    ':usName' => $received_data->_all[1]  ,
    ':usPw' => $received_data->_all[2]  ,
    );  
    $query = "INSERT INTO  $table_users ($cols_add_users) VALUES ($par_add_users )";
    $statement = $connect->prepare($query);
    $statement->execute($data);
 $output = array('message' => 'Data Inserted' );
 echo json_encode($output);
}
if($received_data->action == 'g_users')
{
 $query = " SELECT usID,usName,usPw FROM  $table_users $ORDER_users"; 
//  $query = " SELECT users.usID,users.usName,users.usPw FROM  users  wh $ORDER_users"; 
 $statement = $connect->prepare($query);
 $statement->execute();
 while($row = $statement->fetch(PDO::FETCH_ASSOC))
 {
  $data[] = $row;
 }
 echo json_encode($data);
}
if($received_data->action == 'GetDataById_users')
{
 $query = " SELECT usID,usName,usPw FROM  $table_users  
 and   $col_id_users= ' $received_data->_usID '  $ORDER_users"; 
//  $query = " SELECT users.usID,users.usName,users.usPw FROM  users  wh  
// and   $col_id_users= ' $received_data->_usID '  $ORDER_users"; 
 $statement = $connect->prepare($query);
 $statement->execute();
 while($row = $statement->fetch(PDO::FETCH_ASSOC))
 {
  $data[] = $row;
 }
 echo json_encode($data);
}
if($received_data->action == 'i_users')
{
 $data = array(
':usID' => $received_data->_usID,
':usName' => $received_data->_usName,
':usPw' => $received_data->_usPw,
 );
 $query = "INSERT INTO  $table_users ($cols_add_users) VALUES ($par_add_users )";
 $statement = $connect->prepare($query);
 $statement->execute($data);
 $output = array('message' => 'Data Inserted' );
 echo json_encode($output);
}
if($received_data->action == 's_users')
{
 $query = " SELECT * FROM $table_users 
  WHERE $col_id_users= '".$received_data->_usID."'";
 $statement = $connect->prepare($query);
 $statement->execute();
 $result = $statement->fetchAll();
 foreach($result as $row)
 {
  $data['usID'] = $row['usID'];
  $data['usName'] = $row['usName'];
  $data['usPw'] = $row['usPw'];
  $data['usID'] = $row['usID'];
 }
 echo json_encode($data);
}
if($received_data->action == 'u_users')
{
 $data = array(
  ':usName' => $received_data->_usName,
  ':usPw' => $received_data->_usPw,
  ':usID'   => $received_data->hiddenId
 );

 $query = " UPDATE $table_users $cols_update_users WHERE  usID = :usID ";


 $statement = $connect->prepare($query);
 $statement->execute($data);
 $output = array('message' => 'Data Updated');
 echo json_encode($output);
}
if($received_data->action == 'd_users')
{
 $query = "
 DELETE FROM $table_users  WHERE $col_id_users= '".$received_data->_usID."'";
 $statement = $connect->prepare($query);
 $statement->execute();
 $output = array( 'message' => 'Data Deleted'
 );
 echo json_encode($output);
}
if($received_data->action == 'max_users')
{ 
$max_id = 1;
$stmt =  $connect->prepare("SELECT MAX($col_id_users)+1 AS max_id FROM $table_users");
$stmt->execute();
$invNum = $stmt->fetch(PDO::FETCH_ASSOC);
$max_id = $invNum['max_id'];
if (empty($max_id)||$max_id=='')
 {
  $max_id=1;
}
$data[$col_id_users] =$max_id;
 echo json_encode($data);
}
?>
