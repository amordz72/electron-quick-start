<?php
/**/
 
$dsn = "mysql:host=localhost;dbname=mahal;";
$user = "root";
$pw = "";

$option = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'set names utf8');


try {
  $con =  new PDO($dsn, $user, $pw, $option);
  $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $err) {
  $e = $err->getMessage();
  echo '<div class="bg-danger fs-3 p-3 mt-5 text-center">Not Connect !! </div><hr>' .
    '<div class="bg-info fs-3 p-3 text-center">' .
    $e . "</div><hr>";
}
function getData($tableName, $col_name, $condi = "MAX")
{
  global $con;
  $myData = 0;
  $stmt = $con->prepare("SELECT $condi($col_name) AS data FROM $tableName");
  $stmt->execute();
  $invNum = $stmt->fetch(PDO::FETCH_ASSOC);
  $myData = $invNum['data'];
  return $myData + 1;
}

  
 

