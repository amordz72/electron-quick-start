
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

if ($received_data->action == 'i_tablenames') {
$data = array(':id' => $received_data->_id,
':prNum' => $received_data->_prNum,
':taName' => $received_data->_taName,
);
$query = "INSERT INTO tablenames (id,prNum,taName) VALUES (:id,:prNum,:taName )";
$statement = $connect->prepare($query);
$statement->execute($data);
$output = array('message' => 'Data Inserted');
echo json_encode($output);
}
if ($received_data->action == 'u_tablenames') {
$data = array(':id' => $received_data->_id,
':prNum' => $received_data->_prNum,
':taName' => $received_data->hiddenId,
);

$query = " UPDATE tablenames SET WHERE taName = :taName ";

$statement = $connect->prepare($query);
$statement->execute($data);
$output = array('message' => 'Data Updated');
echo json_encode($output);
}
if ($received_data->action == 'd_tablenames') {
$query = "
DELETE FROM tablenames WHERE taName= '" . $received_data->_taName . "'";
$statement = $connect->prepare($query);
$statement->execute();
$output = array(
'message' => 'Data Deleted'
);
echo json_encode($output);
}
if ($received_data->action == 'max_tablenames') {
$max_id = 1;
$stmt = $connect->prepare("SELECT MAX(taName)+1 AS max_id FROM tablenames");
$stmt->execute();
$invNum = $stmt->fetch(PDO::FETCH_ASSOC);
$max_id = $invNum['max_id'];
if (empty($max_id) || $max_id == '') {
$max_id = 1;
}
$data['taName'] = $max_id;
echo json_encode($data);
}
if ($received_data->action == 'add_all_tablenames') {
$data = array(':id' => $received_data->_all[0],
':prNum' => $received_data->_all[1],
':taName' => $received_data->_all[2],
);
$query = "INSERT INTO tablenames (id,prNum,taName) VALUES (:id,:prNum,:taName )";
$statement = $connect->prepare($query);
$statement->execute($data);
$output = array('message' => 'Data Inserted');
echo json_encode($output);
}
if ($received_data->action == 'g_tablenames')
{
//$query = " SELECT * FROM tablenames,project,project where prNum=prId andtaName= ";
$query = " SELECT id,prName as prNum, as taName FROM tablenames,project,project where prNum=prId andtaName= ";


$statement = $connect->prepare($query);
$statement->execute();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
$data[] = $row;
}
echo json_encode($data);
}
if ($received_data->action == 'GetDataById_tablenames') {
$query = " SELECT id,prName as prNum, as taName FROM tablenames
where taName =". $received_data->_taName." and prNum=prId andtaName= ORDER BY taName DESC";

$statement = $connect->prepare($query);
$statement->execute();
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
$data[] = $row;
}
echo json_encode($data);
}
if ($received_data->action == 's_tablenames')
{

$query = " SELECT id,prNum,taName FROM tablenames
WHERE taName= '" . $received_data->_taName . "'";
$statement = $connect->prepare($query);
$statement->execute();
$result = $statement->fetchAll();
foreach ($result as $row)
{
$data['id'] = $row['id'];
$data['prNum'] = $row['prNum'];
$data['taName'] = $row['taName'];
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

if ($received_data->action == 'fill_taName') {
$query=" SELECT
,
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