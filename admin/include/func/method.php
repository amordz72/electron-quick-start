<?php
//تحويل الى الصفحة الحالية
function thisPage()
{
    echo $_SERVER['PHP_SELF'];
} //تحويل الى الصفحة  
function redirect($url = '')
{
    if ($url == '') {
        header("Location:" . $_SERVER['PHP_SELF']);
        exit();
    } else {
        header("Location:" . $url);
        exit();
    }
}
function issetUser($usName)
{
    if (!isset($usName))
        header("Location:index.php");
}
 function go($page,$do,$par)
{
    /* users.php?do=edit&id=7
 echo  "$page?do=$do&id=<?php . ($_SESSION['usId'])";*/
 echo "$page?do=$do&par=$par";

}
function alert($msg = '')
{
    if ($msg != '') {
        echo "<script type='text/javascript'> alert('" . $msg . "'); </script>";
    }
}
function getTitle()
{
    global $pgTitle;
    if (isset($pgTitle)) {
        echo $pgTitle;
    } else {
        echo "Default";
    }
}


function _print(string $text)
{
    echo $text;
}
