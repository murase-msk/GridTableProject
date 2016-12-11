<?php
include 'global.php';
include '../lib/ChromePhp.php';

if($_POST["type"] == "delete") {

    $id= $_POST["id"];

   	try {
		// 接続
    	 $pdo = new PDO($g_dbname);
		 $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		 $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	    $stmt = $pdo->prepare("delete FROM idnameTable where id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
	    $stmt->execute();
	}catch (Exception $e){
        debug_print_backtrace();
		echo $e->getMessage() . PHP_EOL;
        ChromePhp::log($e->getMessage() . PHP_EOL);
		ChromePhp::log(debug_print_backtrace());
	}
}
