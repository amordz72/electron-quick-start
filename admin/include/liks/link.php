<?php


function _link($link)
{
    static $link = array(
        'users' => 'users.php',
        'bootstrap' =>   'layout/css/bootstrap.min.css',
        'popper' =>   'layout/js/popper.min.js',

        'lang' => 'english',
        'author' => 'amor',
        'HOME' => 'HOME',
        'loginTitle' => 'LOGIN ADMIN',

    );
    echo $link[$link];
}
