
<?php

$username = "root";
$password = "";
$host = "localhost";
$database = "mahal";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$connect = new PDO("mysql:host=$host;dbname=$database", "$username", "$password");
$data = array();
$received_data = json_decode(file_get_contents("php://input"));

if ($received_data->action == 'i_factor') {
    $data = array(
        ':faId' => $received_data->_faId,
        ':doNum' => $received_data->_doNum,
        ':paNum' => $received_data->_paNum,
        ':stNum' => $received_data->_stNum,
        ':faTotal' => $received_data->_faTotal,
        ':faPay' => $received_data->_faPay,
        ':hiNum' => $received_data->_hiNum,
        ':faNotes' => $received_data->_faNotes,
        ':faDt' => $received_data->_faDt,
        ':faTm' => $received_data->_faTm,
    );
    $query = "INSERT INTO factor (faId,doNum,paNum,stNum,faTotal,faPay,hiNum,faNotes,faDt,faTm) VALUES (:faId,:doNum,:paNum,:stNum,:faTotal,:faPay,:hiNum,:faNotes,:faDt,:faTm )";
    $statement = $connect->prepare($query);
    $statement->execute($data);
    $output = array('message' => 'Data Inserted');
    echo json_encode($output);
}
if ($received_data->action == 'u_factor') {
    $data = array(
        ':faId' => $received_data->hiddenId,
        ':doNum' => $received_data->_doNum,
        ':paNum' => $received_data->_paNum,
        ':stNum' => $received_data->_stNum,
        ':faTotal' => $received_data->_faTotal,
        ':faPay' => $received_data->_faPay,
        ':hiNum' => $received_data->_hiNum,
        ':faNotes' => $received_data->_faNotes,
        ':faDt' => $received_data->_faDt,
        ':faTm' => $received_data->_faTm,
    );

    $query = " UPDATE factor SET doNum = :doNum,paNum = :paNum,stNum = :stNum,faTotal = :faTotal,faPay = :faPay,hiNum = :hiNum,faNotes = :faNotes,faDt = :faDt,faTm = :faTm WHERE faId = :faId ";

    $statement = $connect->prepare($query);
    $statement->execute($data);
    $output = array('message' => 'Data Updated');
    echo json_encode($output);
}
if ($received_data->action == 'd_factor') {
    $query = "
DELETE FROM factor WHERE faId= '" . $received_data->_faId . "'";
    $statement = $connect->prepare($query);
    $statement->execute();
    $output = array(
        'message' => 'Data Deleted'
    );
    echo json_encode($output);
}
if ($received_data->action == 'max_factor') {
    $max_id = 1;
    $stmt = $connect->prepare("SELECT MAX(faId)+1 AS max_id FROM factor");
    $stmt->execute();
    $invNum = $stmt->fetch(PDO::FETCH_ASSOC);
    $max_id = $invNum['max_id'];
    if (empty($max_id) || $max_id == '') {
        $max_id = 1;
    }
    $data['faId'] = $max_id;
    echo json_encode($data);
}
if ($received_data->action == 'add_all_factor') {
    $data = array(
        ':faId' => $received_data->_all[0],
        ':doNum' => $received_data->_all[1],
        ':paNum' => $received_data->_all[2],
        ':stNum' => $received_data->_all[3],
        ':faTotal' => $received_data->_all[4],
        ':faPay' => $received_data->_all[5],
        ':hiNum' => $received_data->_all[6],
        ':faNotes' => $received_data->_all[7],
        ':faDt' => $received_data->_all[8],
        ':faTm' => $received_data->_all[9],
    );
    $query = "INSERT INTO factor (faId,doNum,paNum,stNum,faTotal,faPay,hiNum,faNotes,faDt,faTm) VALUES (:faId,:doNum,:paNum,:stNum,:faTotal,:faPay,:hiNum,:faNotes,:faDt,:faTm )";
    $statement = $connect->prepare($query);
    $statement->execute($data);
    $output = array('message' => 'Data Inserted');
    echo json_encode($output);
}
if ($received_data->action == 'g_factor') {
    //$query = " SELECT * FROM factor,doc,payment,store,hisab,hisab,hisab where doNum=doId andpaNum=paId andstNum=stId andhiNum=hiId andfaNotes=hiId andfaDt=hiId ";
    $query = " SELECT faId,doName as doNum,paName as paNum,stName as stNum,faTotal,faPay,
    hiName as hiNum,hiName as faNotes,hiName as faDt,faTm FROM 
    factor,doc,payment,store,hisab,hisab,hisab where doNum=doId andpaNum=paId andstNum=stId andhiNum=hiId andfaNotes=hiId andfaDt=hiId ";


    $statement = $connect->prepare($query);
    $statement->execute();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}
if ($received_data->action == 'GetDataById_factor') {
    $query = " SELECT faId,doName as doNum,paName as paNum,stName as stNum,faTotal,faPay,hiName as hiNum,hiName as faNotes,hiName as faDt,faTm FROM factor
where faId =" . $received_data->_faId . " and doNum=doId andpaNum=paId andstNum=stId andhiNum=hiId andfaNotes=hiId andfaDt=hiId ORDER BY faId DESC";

    $statement = $connect->prepare($query);
    $statement->execute();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}
if ($received_data->action == 's_factor') {

    $query = " SELECT faId,doNum,paNum,stNum,faTotal,faPay,hiNum,faNotes,faDt,faTm FROM factor
WHERE faId= '" . $received_data->_faId . "'";
    $statement = $connect->prepare($query);
    $statement->execute();
    $result = $statement->fetchAll();
    foreach ($result as $row) {
        $data['faId'] = $row['faId'];
        $data['doNum'] = $row['doNum'];
        $data['paNum'] = $row['paNum'];
        $data['stNum'] = $row['stNum'];
        $data['faTotal'] = $row['faTotal'];
        $data['faPay'] = $row['faPay'];
        $data['hiNum'] = $row['hiNum'];
        $data['faNotes'] = $row['faNotes'];
        $data['faDt'] = $row['faDt'];
        $data['faTm'] = $row['faTm'];
    }
    echo json_encode($data);
}

if ($received_data->action == 'fill_doNum') {
    $query = " SELECT
doId,doName
FROM
doc
";
    $statement = $connect->prepare($query);
    $statement->execute();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}

if ($received_data->action == 'fill_paNum') {
    $query = " SELECT
paId,paName
FROM
payment
";
    $statement = $connect->prepare($query);
    $statement->execute();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}

if ($received_data->action == 'fill_stNum') {
    $query = " SELECT
stId,stName
FROM
store
";
    $statement = $connect->prepare($query);
    $statement->execute();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}

if ($received_data->action == 'fill_hiNum') {
    $query = " SELECT
hiId,hiName
FROM
hisab
";
    $statement = $connect->prepare($query);
    $statement->execute();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}

if ($received_data->action == 'fill_faNotes') {
    $query = " SELECT
hiId,hiName
FROM
hisab
";
    $statement = $connect->prepare($query);
    $statement->execute();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}

if ($received_data->action == 'fill_faDt') {
    $query = " SELECT
hiId,hiName
FROM
hisab
";
    $statement = $connect->prepare($query);
    $statement->execute();
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }
    echo json_encode($data);
}
