<?php
// // use this to hide all errore
// error_reporting(0);
// // use this to show all errore
error_reporting(1);
class amor_db 
{
 public $con;
  function __construct( $localhost,$user,$pass,$db,$msg=0)
  {   
      try {
        $this-> con= new PDO('mysql:host='.$localhost.';dbname='.$db.'', $user, $pass);
      return $this-> con;
        if($msg!=0)
         {
             echo('Connect Successfully. okey');
         }
   }
  catch (PDOException $e)
   {
      if($msg!=0)
      {
          print "Error!: " . $e->getMessage() . "<br/>";
      die();
      }
      }
  }
  function run ($sql,$_array){
    $stmt =  $this-> con->prepare($sql);
    $result = $stmt->execute($_array);
return $result;
  }
  function max_id ($tableName,$col_name)
   {
    $max_id = 0;
    $stmt =$this-> con->prepare("SELECT MAX($col_name) AS max_id FROM $tableName");
    $stmt -> execute();
    $invNum = $stmt -> fetch(PDO::FETCH_ASSOC);
    $max_id = $invNum['max_id'];
    return $max_id+1;
  }
  function redirect ($url='')
  {
   if ($url=='') 
   {
    header("Location:".$_SERVER['PHP_SELF']);
   }
 } 
function el_data ($input,$data,$type='v')
   {
       if($type=='v')
    echo "<script> var v=     document.getElementById('$input');v.value= '".$data."';</script> ";
 else   if($type=='i')
    echo "<script>  var v=   document.getElementById('$input');v.innerHTML= '".$data."';</script> ";
      else if ($type=='s')
    echo "<script>     document.getElementById('$input').src= '".$data."'; </script> ";
  }
  function   FillTable( $tableName,$columns,$where="" )
  {
     echo("<tbody>");
if($where=="")
  $result =  $this-> con->prepare("SELECT $columns FROM $tableName ");
  else
  $result =  $this-> con->prepare("SELECT $columns FROM $tableName where $where");
    if ($result->execute()){
    $rows = $result->fetchAll(PDO::FETCH_ASSOC);
    $col_names = explode(',', $columns);
    foreach($rows as $row){
    echo("<tr>");
    foreach($col_names as $col_name){
    if (!isset($row[$col_name])){
    continue;
    }
    echo("<td>".$row[$col_name]."</td>");
    }
    echo("</tr>");
    echo("</tbody>");
        }
    }
    }
    function   FillSelect( $tableName,$columns,$where="" )
  {
if($where=="")
  $result =  $this-> con->prepare("SELECT $columns FROM $tableName ");
  else
  $result =  $this-> con->prepare("SELECT $columns FROM $tableName where $where");
    if ($result->execute()){
    $rows = $result->fetchAll(PDO::FETCH_ASSOC);
    $col_names = explode(',', $columns);
      foreach($rows as $row){
    // echo("<tr>");
    foreach($col_names as $col_name){}
    if (!isset($row[$col_name])){
    continue;
    }
    echo("<option value=".$row[$col_names[0]].">".$row[$col_names[1]]."</option>");
    }
    // echo("</tr>");
        /**/  
    }
    }
    // //   بحث عن قيمة لحقل في جدول
    function check_data ($tableName,$col_name,  $data )
    {
      $read = $this->con ->query(" SELECT $col_name FROM $tableName");
      while($row = $read->fetch(PDO::FETCH_ASSOC)){
        if( $data == $row[$col_name])
         return true;
      }
      return false;
    }
    function alert($msg){
      echo '<script type="text/javascript"> alert("'.$msg.'"); </script>';
    }
    function check_email_and_pass( $tableName, $email,$pass,$emailData,$passData)
    {
      try { 
         @$read = $this->con->prepare("SELECT * FROM $tableName WHERE $email = '$emailData' and  $pass = '$passData'");
        $read->execute();
        while($row = $read->fetch(PDO::FETCH_ASSOC)){
          if($emailData == $row[$email] && $passData == $row[$pass])
          {
         return true;
          }
          else
          {
           return false; }
            }
   }
  catch (PDOException $e)
   {
          print "Error!: " . $e->getMessage() . "<br/>";
      die();
      return false;
      }
    }
    function EXPORT_DATABASE($host,$user,$pass,$name,       $tables=false, $backup_name=false)
    { 
      set_time_limit(3000); $mysqli = new mysqli($host,$user,$pass,$name); 
      $mysqli->select_db($name); $mysqli->query("SET NAMES 'utf8'");
      $queryTables = $mysqli->query('SHOW TABLES'); 
      while($row = $queryTables->fetch_row()) { $target_tables[] = $row[0]; }	
      if($tables !== false) { $target_tables = array_intersect( $target_tables, $tables); } 
      $content = "SET SQL_MODE = \"NO_AUTO_VALUE_ON_ZERO\";\r\nSET time_zone = \"+00:00\";\r\n\r\n\r\n/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;\r\n/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;\r\n/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;\r\n/*!40101 SET NAMES utf8 */;\r\n--\r\n-- Database: `".$name."`\r\n--\r\n\r\n\r\n";
      foreach($target_tables as $table){
        if (empty($table)){ continue; } 
        $result	= $mysqli->query('SELECT * FROM `'.$table.'`');  
        	$fields_amount=$result->field_count; 
           $rows_num=$mysqli->affected_rows; 
           	$res = $mysqli->query('SHOW CREATE TABLE '.$table);
             	$TableMLine=$res->fetch_row(); 
        $content .= "\n\n".$TableMLine[1].";\n\n"; 
          $TableMLine[1]=str_ireplace('CREATE TABLE `','CREATE TABLE IF NOT EXISTS `',$TableMLine[1]);
        for ($i = 0, $st_counter = 0; $i < $fields_amount;   $i++, $st_counter=0) {
          while($row = $result->fetch_row())	{ //when started (and every after 100 command cycle):
            if ($st_counter%100 == 0 || $st_counter == 0 )	{$content .= "\nINSERT INTO ".$table." VALUES";}
              $content .= "\n(";    for($j=0; $j<$fields_amount; $j++){ $row[$j] = str_replace("\n","\\n", addslashes($row[$j]) ); if (isset($row[$j])){$content .= '"'.$row[$j].'"' ;}  else{$content .= '""';}	   if ($j<($fields_amount-1)){$content.= ',';}   }        $content .=")";
            //every after 100 command cycle [or at last line] ....p.s. but should be inserted 1 cycle eariler
            if ( (($st_counter+1)%100==0 && $st_counter!=0) || $st_counter+1==$rows_num) {$content .= ";";} else {$content .= ",";}	$st_counter=$st_counter+1;
          }
        } $content .="\n\n\n";
      }
      $content .= "\r\n\r\n/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;\r\n/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;\r\n/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;";
      $backup_name = $backup_name ? $backup_name : $name.'___('.date('H-i-s').'_'.date('d-m-Y').').sql';
      ob_get_clean(); header('Content-Type: application/octet-stream');  header("Content-Transfer-Encoding: Binary");  header('Content-Length: '. (function_exists('mb_strlen') ? mb_strlen($content, '8bit'): strlen($content)) );    header("Content-disposition: attachment; filename=\"".$backup_name."\""); 
      echo $content; exit;
    }
    function EXPORT_DATABASE1($host,$user,$pass,$database ,$dir="D:\xampp\htdocs\proj_1\bk\dump.sql")
    { 
      ini_set('display_errors', 1);
      ini_set('display_startup_errors', 1);
      error_reporting(E_ALL);
      // $database = 'db';
      // $user = 'user';
      // $pass = 'pass';
      // $host = 'localhost';
      // $dir = dirname(__FILE__) . '/dump.sql';
      echo "<h3>Backing up database to `<code>{$dir}</code>`</h3>";
      exec("mysqldump --user={$user} --password={$pass} --host={$host} {$database} --result-file={$dir} 2>&1", $output);
      var_dump($output);
    }
  }
 class amor_tools{
function is_embty($control ){
  if( empty( $control))
    {
   $_SESSION['msg']= $control." هناك حقل مطلوب  ";
   return true;
      }
      else
      {
          return false;
      }
}
function redirect ($url='')
{
 if ($url=='') 
 {
  header("Location:".$_SERVER['PHP_SELF']);
 } 
 else {
  header("Location:" .$url);
 }
}
function alert($msg=''){
  if($msg !=''){
      echo "<script type='text/javascript'> alert('".$msg."'); </script>";
}
}
function mysql_date($date ){
  if (!isset($date)|| empty($date) ) 
  {
   $date= date("Y/m/d");
  }
  $ndate = $date;
  $ndate= date('Y-m-d',strtotime($date));
  return $ndate;
}
function ch_bool($myCheck ){
  $isActiv = FALSE;
  if (isset($myCheck)) {
      $isActiv = TRUE;
  }
  return  $isActiv;
}
function flash_msg($msg){
   if(isset ($msg)&& !empty($msg)  ){
  $this->  alert($msg);
    unset($msg);} 
}}
