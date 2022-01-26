
<?php

$username="root";
$password="";
$host="localhost";
$database="webdb";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$connect = new PDO("mysql:host=$host;dbname=webdb", "$username", "$password");
$data = array();
$received_data = json_decode(file_get_contents("php://input"));

if ($received_data->action == 'i_laravel_code') {
$data = array(':id' => $received_data->_id,
':code_title' => $received_data->_code_title,
':code_body' => $received_data->_code_body,
':code_des' => $received_data->_code_des,
);
$query = "INSERT INTO laravel_code (id,code_title,code_body,code_des) VALUES (:id,:code_title,:code_body,:code_des )";
$statement = $connect->prepare($query);
$statement->execute($data);
$output = array('message' => 'Data Inserted');
echo json_encode($output);
}
if ($received_data->action == 'u_laravel_code') {
$data = array(':id' => $received_data->hiddenId,
':code_title' => $received_data->_code_title,
':code_body' => $received_data->_code_body,
':code_des' => $received_data->_code_des,
);

$query = " UPDATE laravel_code SET code_title = :code_title,code_body = :code_body,code_des = :code_des WHERE id = :id ";

$statement = $connect->prepare($query);
$statement->execute($data);
$output = array('message' => 'Data Updated');
echo json_encode($output);
}
if ($received_data->action == 'd_laravel_code') {
$query = "
DELETE FROM laravel_code WHERE id= '" . $received_data->_id . "'";
$statement = $connect->prepare($query);
$statement->execute();
$output = array(
'message' => 'Data Deleted'
);
echo json_encode($output);
}
if ($received_data->action == 'max_laravel_code') {
$max_id = 1;
$stmt = $connect->prepare("SELECT MAX(id)+1 AS max_id FROM laravel_code");
$stmt->execute();
$invNum = $stmt->fetch(PDO::FETCH_ASSOC);
$max_id = $invNum['max_id'];
if (empty($max_id) || $max_id == '') {
$max_id = 1;
}
$data['id'] = $max_id;
echo json_encode($data);
}
if ($received_data->action == 'add_all_laravel_code') {
$data = array(':id' => $received_data->_all[0],
':code_title' => $received_data->_all[1],
':code_body' => $received_data->_all[2],
':code_des' => $received_data->_all[3],
);
$query = "INSERT INTO laravel_code (id,code_title,code_body,code_des) VALUES (:id,:code_title,:code_body,:code_des )";
$statement = $connect->prepare($query);
$statement->execute($data);
$output = array('message' => 'Data Inserted');
echo json_encode($output);
}
if ($received_data->action == 'g_laravel_code')
{
$query = " SELECT * FROM laravel_code ";
$query = " SELECT id,code_title,code_body,code_des FROM laravel_code ";


$statement = $connect->prepare($query);
$statement->execute();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
$data[] = $row;
}
echo json_encode($data);
}
if ($received_data->action == 'GetDataById_laravel_code') {
$query = " SELECT id,code_title,code_body,code_des FROM laravel_code
where id =". $received_data->_id." ORDER BY id DESC";

$statement = $connect->prepare($query);
$statement->execute();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
$data[] = $row;
}
echo json_encode($data);
}
if ($received_data->action == 's_laravel_code')
{

$query = " SELECT id,code_title,code_body,code_des FROM laravel_code
WHERE id= '" . $received_data->_id . "'";
$statement = $connect->prepare($query);
$statement->execute();
$result = $statement->fetchAll();
foreach ($result as $row)
{
$data['id'] = $row['id'];
$data['code_title'] = $row['code_title'];
$data['code_body'] = $row['code_body'];
$data['code_des'] = $row['code_des'];
}
echo json_encode($data);
}