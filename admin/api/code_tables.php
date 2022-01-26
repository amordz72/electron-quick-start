
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

if ($received_data->action == 'i_code_tables') {
$data = array(':coId' => $received_data->_coId,
':taName' => $received_data->_taName,
':laNum' => $received_data->_laNum,
':prName' => $received_data->_prName,
);
$query = "INSERT INTO code_tables (coId,taName,laNum,prName) VALUES (:coId,:taName,:laNum,:prName )";
$statement = $connect->prepare($query);
$statement->execute($data);
$output = array('message' => 'Data Inserted');
echo json_encode($output);
}
if ($received_data->action == 'u_code_tables') {
$data = array(':coId' => $received_data->hiddenId,
':taName' => $received_data->_taName,
':laNum' => $received_data->_laNum,
':prNum' => $received_data->_prNum,
);

$query = " UPDATE code_tables SET taName = :taName,laNum = :laNum,prNum = :prNum WHERE coId = :coId ";

$statement = $connect->prepare($query);
$statement->execute($data);
$output = array('message' => 'Data Updated');
echo json_encode($output);
}
if ($received_data->action == 'd_code_tables') {
$query = "
DELETE FROM code_tables WHERE coId= '" . $received_data->_coId . "'";
$statement = $connect->prepare($query);
$statement->execute();
$output = array(
'message' => 'Data Deleted'
);
echo json_encode($output);
}
if ($received_data->action == 'max_code_tables') {
$max_id = 1;
$stmt = $connect->prepare("SELECT MAX(coId)+1 AS max_id FROM code_tables");
$stmt->execute();
$invNum = $stmt->fetch(PDO::FETCH_ASSOC);
$max_id = $invNum['max_id'];
if (empty($max_id) || $max_id == '') {
$max_id = 1;
}
$data['coId'] = $max_id;
echo json_encode($data);
}
if ($received_data->action == 'add_all_code_tables') {
$data = array(':coId' => $received_data->_all[0],
':taName' => $received_data->_all[1],
':laNum' => $received_data->_all[2],
':prNum' => $received_data->_all[3],
);
$query = "INSERT INTO code_tables (coId,taName,laNum,prNum) VALUES (:coId,:taName,:laNum,:prNum )";
$statement = $connect->prepare($query);
$statement->execute($data);
$output = array('message' => 'Data Inserted');
echo json_encode($output);
}
if ($received_data->action == 'g_code_tables')
{
//$query = " SELECT * FROM code_tables,lang,project where laNum=laId andprNum=prId ";
$query = " SELECT coId,taName,laName as laNum,prName as prNum FROM code_tables,lang,project where laNum=laId andprNum=prId ";


$statement = $connect->prepare($query);
$statement->execute();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
$data[] = $row;
}
echo json_encode($data);
}
if ($received_data->action == 'GetDataById_code_tables') {
$query = " SELECT coId,taName,laName as laNum,prName as prNum FROM code_tables
where coId =". $received_data->_coId." and laNum=laId andprNum=prId ORDER BY coId DESC";

$statement = $connect->prepare($query);
$statement->execute();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
$data[] = $row;
}
echo json_encode($data);
}
if ($received_data->action == 's_code_tables')
{

$query = " SELECT coId,taName,laNum,prNum FROM code_tables
WHERE coId= '" . $received_data->_coId . "'";
$statement = $connect->prepare($query);
$statement->execute();
$result = $statement->fetchAll();
foreach ($result as $row)
{
$data['coId'] = $row['coId'];
$data['taName'] = $row['taName'];
$data['laNum'] = $row['laNum'];
$data['prNum'] = $row['prNum'];
}
echo json_encode($data);
}

if ($received_data->action == 'fill_laNum') {
$query=" SELECT
laId,laName
FROM
lang
";
$statement = $connect->prepare($query);
$statement->execute();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
$data[] = $row;
}
echo json_encode($data);

}

if ($received_data->action == 'fill_prNum') {
$query=" SELECT
prId,prName
FROM
project
";
$statement = $connect->prepare($query);
$statement->execute();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
$data[] = $row;
}
echo json_encode($data);

}