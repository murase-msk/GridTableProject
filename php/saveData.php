<?php
include '../lib/ChromePhp.php';
include 'global.php';

    ChromePhp::log("save");

// データ保存.
if($_POST["oper"] == "edit") {
//	ChromePhp::log($_POST);
	$columnList = $_POST;
	// echo('<pre>');
	// var_dump($columnList);
	// echo('</pre>');

	unset($columnList["type"]);
	unset($columnList["oper"]);
	
	// // バリデーション.
    // if(!is_numeric($test_id)){
    //     header('HTTP/1.1 500 Internal Server Error');
    //     return;
    // }

  	try {
		  // すでにあるデータであればアップデート、そうでなければインサート. 
		// 接続
    	 $pdo = new PDO($g_dbname);
		 $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		 $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	    $stmt = $pdo->prepare("SELECT count(*) as count FROM ".$g_tableName." where id = :id");
        $stmt->bindParam(':id', $columnList["id"], PDO::PARAM_INT);
	    $stmt->execute();
	    $r1 = $stmt->fetchAll();
		if($r1[0]['count'] == 1){
			updateNewRecord($columnList);
		}else{
			saveNewRecord($columnList);
		}
	}catch (Exception $e){
        debug_print_backtrace();
		echo $e->getMessage() . PHP_EOL;
        ChromePhp::log($e->getMessage() . PHP_EOL);
		ChromePhp::log(debug_print_backtrace());
	}

}

//データの更新.
function updateNewRecord($columnList){
	include 'global.php';
	$string = "";
	$string .= "update ".$g_tableName." set ";
	foreach($columnList as $key => $value){
		$string .= "".$key."=:".$key.",";
	}
	$string = rtrim($string, ',');
	echo $string;
	echo "\n";
	try {
		// 接続
		$pdo = new PDO($g_dbname);
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	    $stmt = $pdo->prepare($string." where id= :id");
        $stmt->bindParam(':id', $columnList["id"], PDO::PARAM_INT);
        $stmt->bindParam(':ryuudou', $columnList["ryuudou"], PDO::PARAM_STR);
		$stmt->bindParam(':kanriNo', $columnList["kanriNo"], PDO::PARAM_INT);
		$stmt->bindParam(':hakkoubi', $columnList["hakkoubi"], PDO::PARAM_STR);
		$stmt->bindParam(':kubun', $columnList["kubun"], PDO::PARAM_STR);
		$stmt->bindParam(':ijo_No', $columnList["ijo_No"], PDO::PARAM_INT);
		$stmt->bindParam(':hinban', $columnList["hinban"], PDO::PARAM_INT);
		$stmt->bindParam(':Wlot', $columnList["Wlot"], PDO::PARAM_STR);
		$stmt->bindParam(':Mlot', $columnList["Mlot"], PDO::PARAM_STR);
		$stmt->bindParam(':ijounaiyou', $columnList["ijounaiyou"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_genin', $columnList["seigi_genin"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_comento', $columnList["seigi_comento"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_tantou1', $columnList["seigi_tantou1"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_teisyutubi1', $columnList["seigi_teisyutubi1"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_tantou2', $columnList["seigi_tantou2"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_teisyutubi2', $columnList["seigi_teisyutubi2"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_kigen', $columnList["seigi_kigen"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_syounin', $columnList["seigi_syounin"], PDO::PARAM_STR);
		$stmt->bindParam(':hinkan_uketukebi', $columnList["hinkan_uketukebi"], PDO::PARAM_STR);
		$stmt->bindParam(':hinkan_tantou', $columnList["hinkan_tantou"], PDO::PARAM_STR);
		$stmt->bindParam(':hinkan_kigen', $columnList["hinkan_kigen"], PDO::PARAM_STR);
		$stmt->bindParam(':hinkan_kahi', $columnList["hinkan_kahi"], PDO::PARAM_STR);
		$stmt->bindParam(':hinkan_syounin', $columnList["hinakn_syounin"], PDO::PARAM_STR);

	    $stmt->execute();

		$sqlDump = $stmt->debugDumpParams();
		ChromePhp::log($sqlDump);
	}catch (Exception $e){
		echo $e->getMessage() . PHP_EOL;
        ChromePhp::log($e->getMessage() . PHP_EOL);
	}
}

//新しいデータの保存
function saveNewRecord($columnList){
	include 'global.php';
	unset($columnList["id"]);
	$string = "";
	$string .= "insert into ".$g_tableName." ( ";
	foreach($columnList as $key => $value){
		$string .= "".$key.",";
	}
	$string = rtrim($string, ',');
	$string .=") values(";
	foreach($columnList as $key => $value){
		$string .= ":".$key.",";
	}
	$string = rtrim($string, ',');
	$string .=")";

	try {
		// 接続
		 $pdo = new PDO($g_dbname);
		 $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		 $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	    $stmt = $pdo->prepare($string);
//        $stmt->bindParam(':id', $columnList["id"], PDO::PARAM_INT);
        $stmt->bindParam(':ryuudou', $columnList["ryuudou"], PDO::PARAM_STR);
		$stmt->bindParam(':kanriNo', $columnList["kanriNo"], PDO::PARAM_INT);
		$stmt->bindParam(':hakkoubi', $columnList["hakkoubi"], PDO::PARAM_STR);
		$stmt->bindParam(':kubun', $columnList["kubun"], PDO::PARAM_STR);
		$stmt->bindParam(':ijo_No', $columnList["ijo_No"], PDO::PARAM_INT);
		$stmt->bindParam(':hinban', $columnList["hinban"], PDO::PARAM_INT);
		$stmt->bindParam(':Wlot', $columnList["Wlot"], PDO::PARAM_STR);
		$stmt->bindParam(':Mlot', $columnList["Mlot"], PDO::PARAM_STR);
		$stmt->bindParam(':ijounaiyou', $columnList["ijounaiyou"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_genin', $columnList["seigi_genin"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_comento', $columnList["seigi_comento"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_tantou1', $columnList["seigi_tantou1"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_teisyutubi1', $columnList["seigi_teisyutubi1"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_tantou2', $columnList["seigi_tantou2"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_teisyutubi2', $columnList["seigi_teisyutubi2"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_kigen', $columnList["seigi_kigen"], PDO::PARAM_STR);
		$stmt->bindParam(':seigi_syounin', $columnList["seigi_syounin"], PDO::PARAM_STR);
		$stmt->bindParam(':hinkan_uketukebi', $columnList["hinkan_uketukebi"], PDO::PARAM_STR);
		$stmt->bindParam(':hinkan_tantou', $columnList["hinkan_tantou"], PDO::PARAM_STR);
		$stmt->bindParam(':hinkan_kigen', $columnList["hinkan_kigen"], PDO::PARAM_STR);
		$stmt->bindParam(':hinkan_kahi', $columnList["hinkan_kahi"], PDO::PARAM_STR);
		$stmt->bindParam(':hinkan_syounin', $columnList["hinakn_syounin"], PDO::PARAM_STR);
	    $stmt->execute();
		$sqlDump = $stmt->debugDumpParams();
		ChromePhp::log($sqlDump);
	}catch (Exception $e){
		echo $e->getMessage() . PHP_EOL;
        ChromePhp::log($e->getMessage() . PHP_EOL);
	}
}

function validateInt(){

}
function validateString(){

}
function validateData(){

}
function errorResponse(){
    header('HTTP/1.1 500 Internal Server Error');
}