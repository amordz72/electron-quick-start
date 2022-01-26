<?php
//  use this to hide all errore
//error_reporting(1);

class amor_db
{
    public $con;
  
    function __construct($db, $localhost = "localhost", $user = "root", $pass = "", $msg = 0)
    {
        try {
            $this->con = new PDO('mysql:host=' . $localhost . ';dbname=' . $db . '', $user, $pass);
            // return $this->con;
            if ($msg != 0) {
                echo ('Connect Successfully. okey');
            }
        } catch (PDOException $e) {
            if ($msg != 0) {
                print "Error!: " . $e->getMessage() . "<br/>";
                die();
            }
        }
    }
    function run($sql, $_array)
    {
        $stmt =  $this->con->prepare($sql);
        $result = $stmt->execute($_array);
        return $result;
    }
    function max_id($tableName, $col_name)
    {
        $max_id = 0;
        $stmt = $this->con->prepare("SELECT MAX($col_name) AS max_id FROM $tableName");
        $stmt->execute();
        $invNum = $stmt->fetch(PDO::FETCH_ASSOC);
        $max_id = $invNum['max_id'];
        return $max_id + 1;
    }

    function   FillSelect($tableName, $columns, $where = "")
    {
        if ($where == "")
            $result =  $this->con->prepare("SELECT $columns FROM $tableName ");
        else
            $result =  $this->con->prepare("SELECT $columns FROM $tableName where $where");
        if ($result->execute()) {
            $rows = $result->fetchAll(PDO::FETCH_ASSOC);
            $col_names = explode(',', $columns);
            foreach ($rows as $row) {
                // echo("<tr>");
                foreach ($col_names as $col_name) {
                }
                if (!isset($row[$col_name])) {
                    continue;
                }
                echo ("<option value=" . $row[$col_names[0]] . ">" . $row[$col_names[1]] . "</option>");
            }
            // echo("</tr>");
            /**/
        }
    }
  /*  function el_data($input, $data, $type = 'v')
    {
        if ($type == 'v')
            echo "<script> var v=     document.getElementById('$input');v.value= '" . $data . "';</script> ";
        else   if ($type == 'i')
            echo "<script>  var v=   document.getElementById('$input');v.innerHTML= '" . $data . "';</script> ";
        else if ($type == 's')
            echo "<script>     document.getElementById('$input').src= '" . $data . "'; </script> ";
    }
    function   FillTable($tableName, $columns, $where = "")
    {
        echo ("<tbody>");
        if ($where == "")
            $result =  $this->con->prepare("SELECT $columns FROM $tableName ");
        else
            $result =  $this->con->prepare("SELECT $columns FROM $tableName where $where");
        if ($result->execute()) {
            $rows = $result->fetchAll(PDO::FETCH_ASSOC);
            $col_names = explode(',', $columns);
            foreach ($rows as $row) {
                echo ("<tr>");
                foreach ($col_names as $col_name) {
                    if (!isset($row[$col_name])) {
                        continue;
                    }
                    echo ("<td>" . $row[$col_name] . "</td>");
                }
                echo ("</tr>");
                echo ("</tbody>");
            }
        }
    }

    //  بحث عن قيمة لحقل في جدول
    function check_data($tableName, $col_name,  $data)
    {
        $read = $this->con->query(" SELECT $col_name FROM $tableName");
        while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
            if ($data == $row[$col_name])
                return true;
        }
        return false;
    } 
  
    function check_email_and_pass($tableName, $email, $pass, $emailData, $passData)
    {
        try {
            @$read = $this->con->prepare("SELECT * FROM $tableName WHERE $email = '$emailData' and  $pass = '$passData'");
            $read->execute();
            while ($row = $read->fetch(PDO::FETCH_ASSOC)) {
                if ($emailData == $row[$email] && $passData == $row[$pass]) {
                    return true;
                } else {
                    return false;
                }
            }
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
            return false;
        }
    }*/
}
class amor_tools
{
    function is_embty($control)
    {
        if (empty($control)) {
            $_SESSION['msg'] = $control . " هناك حقل مطلوب  ";
            return true;
        } else {
            return false;
        }
    }
    function redirect($url = '')
    {
        if ($url == '') {
            header("Location:" . $_SERVER['PHP_SELF']);
        } else {
            header("Location:" . $url);
        }
    }
    function alert($msg = '')
    {
        if ($msg != '') {
            echo "<script type='text/javascript'> alert('" . $msg . "'); </script>";
        }
    }
    function mysql_date($date)
    {
        if (!isset($date) || empty($date)) {
            $date = date("Y/m/d");
        }
        $ndate = $date;
        $ndate = date('Y-m-d', strtotime($date));
        return $ndate;
    }
    function ch_bool($myCheck)
    {
        $isActiv = FALSE;
        if (isset($myCheck)) {
            $isActiv = TRUE;
        }
        return  $isActiv;
    }
    function flash_msg($msg)
    {
        if (isset($msg) && !empty($msg)) {
            $this->alert($msg);
            unset($msg);
        }
    }
}
