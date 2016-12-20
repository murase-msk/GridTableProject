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
	$config = json_decode("../db/columnConfig.json",true);
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
			if(isUpdate($columnList)){
				updateRecord($columnList,$config);
			}else{
				// サーバーエラーを返す.
				header('HTTP/1.1 500 Internal Server Error');
			}
		}else{
			saveNewRecord($columnList,$config);
		}
	}catch (Exception $e){
        debug_print_backtrace();
		echo $e->getMessage() . PHP_EOL;
        ChromePhp::log($e->getMessage() . PHP_EOL);
		ChromePhp::log(debug_print_backtrace());
	}

}

// 楽観的排他制御　画面を表示してから他の人が更新した時は更新できない.
function isUpdate($columnList){
//	ChromePhp::log("isUpdate");
	include 'global.php';
		try {
		// 接続
		$pdo = new PDO($g_dbname);
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	    $stmt = $pdo->prepare("select count(*) as count from ". $g_tableName." where id=:id and last_edit<:open_time");
		$stmt->bindParam(':'."id", $columnList["id"], PDO::PARAM_INT);
		$stmt->bindParam(':'."open_time", $columnList["open_time"], PDO::PARAM_STR);
	    $stmt->execute();
		foreach ($stmt as $row) {
			$count = $row["count"];
//			ChromePhp::log($count);	
		}

//		ChromePhp::log($columnList["open_time"]);
//		var_dump($columnList);
//		$sqlDump = $stmt->debugDumpParams();
//		ChromePhp::log($sqlDump);
	}catch (Exception $e){
		echo $e->getMessage() . PHP_EOL;
        ChromePhp::log($e->getMessage() . PHP_EOL);
	}
	if($count == 1){
		return true;
	}else{
		return false;
	}
}

//データの更新.
function updateRecord($columnList, $config){
	// SQL文作成.
	include 'global.php';
	var_dump($config);
	$string = "";
	$string .= "update ".$g_tableName." set ";
	foreach($config as $key => $value){
		if($config[$key]["name"] === "id") continue;
		$string .= "".$config[$key]["name"]."=:".$config[$key]["name"].",";
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
		foreach($config as $key => $value){
			$param = null;
			if($config[$key]["type"] === "int"){
				$param = PDO::PARAM_INT;
			}else{
				$param = PDO::PARAM_STR;
			}
			$stmt->bindParam(':'.$config[$key]["name"], $columnList[$config[$key]["name"]], $param);
		}

	    $stmt->execute();

		// $sqlDump = $stmt->debugDumpParams();
		// ChromePhp::log($sqlDump);
	}catch (Exception $e){
		echo $e->getMessage() . PHP_EOL;
        ChromePhp::log($e->getMessage() . PHP_EOL);
	}
}

//新しいデータの保存
function saveNewRecord($columnList, $config){
	// SQL文作成.
	include 'global.php';
	$string = "";
	$string .= "insert into ".$g_tableName." ( ";
	foreach($config as $key => $value){
		if($config[$key]["name"] === "id") continue;
		$string .= "".$config[$key]["name"].",";
	}
	$string = rtrim($string, ',');
	$string .=") values(";
	foreach($config as $key => $value){
		if($config[$key]["name"] === "id") continue;
		$string .= ":".$config[$key]["name"].",";
	}
	$string = rtrim($string, ',');
	$string .=")";
	try {
		// 接続
		 $pdo = new PDO($g_dbname);
		 $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		 $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	    $stmt = $pdo->prepare($string);
		foreach($config as $key => $value){
			if($config[$key]["name"] === "id") continue;
			$param = null;
			if($config[$key]["type"] === "int"){
				$param = PDO::PARAM_INT;
			}else{
				$param = PDO::PARAM_STR;
			}
			$stmt->bindParam(':'.$config[$key]["name"], $columnList[$config[$key]["name"]], $param);
		}

	    $stmt->execute();
		//  $sqlDump = $stmt->debugDumpParams();
		//  ChromePhp::log($sqlDump);
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