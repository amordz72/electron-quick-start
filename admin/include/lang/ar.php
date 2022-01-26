<?php

function _lang($phrase)
{
    static $lang = array(
        'html' => '<html lang="ar" dir="rtl>"',
         'bootstrap' =>   'layout/css/bootstrap.rtl.min.css',
       'popper' =>   'layout/js/popper.rtl.min.js',
        'lang' => 'العربية',
        'author' => 'عمر',
        'HOME' => 'الرئيسة',
        'loginTitle' => 'دخول المستخدمين');
    echo $lang[$phrase];
}
