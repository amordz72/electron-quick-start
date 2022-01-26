
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

if ($received_data->action == 'i_project') {
$data = array(':prId' => $received_data->_prId,
':prName' => $received_data->_prName,
':dtEnter' => $received_data->_dtEnter,
);
$query = "INSERT INTO project (prId,prName,dtEnter) VALUES (:prId,:prName,:dtEnter )";
$statement = $connect->prepare($query);
$statement->execute($data);
$output = array('message' => 'Data Inserted');
echo json_encode($output);
}
if ($received_data->action == 'u_project') {
$data = array(':prId' => $received_data->hiddenId,
':prName' => $received_data->_prName,
':dtEnter' => $received_data->_dtEnter,
);

$query = " UPDATE project SET prName = :prName,dtEnter = :dtEnter WHERE prId = :prId ";

$statement = $connect->prepare($query);
$statement->execute($data);
$output = array('message' => 'Data Updated');
echo json_encode($output);
}
if ($received_data->action == 'd_project') {
$query = "
DELETE FROM project WHERE prId= '" . $received_data->_prId . "'";
$statement = $connect->prepare($query);
$statement->execute();
$output = array(
'message' => 'Data Deleted'
);
echo json_encode($output);
}
if ($received_data->action == 'max_project') {
$max_id = 1;
$stmt = $connect->prepare("SELECT MAX(prId)+1 AS max_id FROM project");
$stmt->execute();
$invNum = $stmt->fetch(PDO::FETCH_ASSOC);
$max_id = $invNum['max_id'];
if (empty($max_id) || $max_id == '') {
$max_id = 1;
}
$data['prId'] = $max_id;
echo json_encode($data);
}
if ($received_data->action == 'add_all_project') {
$data = array(':prId' => $received_data->_all[0],
':prName' => $received_data->_all[1],
':dtEnter' => $received_data->_all[2],
);
$query = "INSERT INTO project (prId,prName,dtEnter) VALUES (:prId,:prName,:dtEnter )";
$statement = $connect->prepare($query);
$statement->execute($data);
$output = array('message' => 'Data Inserted');
echo json_encode($output);
}
if ($received_data->action == 'g_project')
{
//$query = " SELECT * FROM project ";
$query = " SELECT prId,prName,dtEnter FROM project ";


$statement = $connect->prepare($query);
$statement->execute();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
$data[] = $row;
}
echo json_encode($data);
}
if ($received_data->action == 'GetDataById_project') {
$query = " SELECT prId,prName,dtEnter FROM project
where prId =". $received_data->_prId." ORDER BY prId DESC";

$statement = $connect->prepare($query);
$statement->execute();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
$data[] = $row;
}
echo json_encode($data);
}
if ($received_data->action == 's_project')
{

$query = " SELECT prId,prName,dtEnter FROM project
WHERE prId= '" . $received_data->_prId . "'";
$statement = $connect->prepare($query);
$statement->execute();
$result = $statement->fetchAll();
foreach ($result as $row)
{
$data['prId'] = $row['prId'];
$data['prName'] = $row['prName'];
$data['dtEnter'] = $row['dtEnter'];
}
echo json_encode($data);
}