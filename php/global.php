<?php

$g_dbname = 'sqlite:../db/ijorenDB.sqlite3';
$g_tableName = "ijorenTable";

$g_columnList = array(
    "id",
    "ryuudou","kanriNo","hakkoubi","kubun","ijo_No","hinban","Wlot","Mlot","ijounaiyou",
    "seigi_genin","seigi_comento","seigi_tantou1","seigi_teisyutubi1","seigi_tantou2","seigi_teisyutubi2","seigi_kigen","seigi_syounin",
    "hinkan_uketukebi","hinkan_tantou","hinkan_kigen","hinkan_kahi","hinkan_syounin","last_edit"
);

$g_columnList2 = array(
    "id"=>"int",
    "ryuudou"=>"str","kanriNo"=>"int","hakkoubi"=>"str","kubun"=>"str","ijo_No"=>"int",
        "hinban"=>"int","Wlot"=>"str","Mlot"=>"str","ijounaiyou"=>"str",
    "seigi_genin"=>"str","seigi_comento"=>"str","seigi_tantou1"=>"str","seigi_teisyutubi1"=>"str",
        "seigi_tantou2"=>"str","seigi_teisyutubi2"=>"str","seigi_kigen"=>"str","seigi_syounin"=>"str",
    "hinkan_uketukebi"=>"str","hinkan_tantou"=>"str","hinkan_kigen"=>"str","hinkan_kahi"=>"str","hinkan_syounin"=>"str",
    "last_edit"=>"str"
);