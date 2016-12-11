<?php
include '../lib/ChromePhp.php';
include './global.php';

//    ChromePhp::log("get");

// データ取得.
if($_GET["option"] == "aaa"){
	getAllData($_GET["option"], $_GET["sidx"], $_GET["sord"]);
}elseif($_GET["option"] == "search"){
	getAllData($_GET["option"], $_GET["sidx"], $_GET["sord"], $_GET["columnList"],
	 $_GET["filterList"], $_GET["word1"], $_GET["word2"]);
}else{
	echo "リクエストパラメータがおかしいです";
}

// 全データの取得
// $option リクエストのoption=...
// $sortIndex どの行をソートするか。省略されればソートしない
// $sortType 降順昇順($sortIndexが""であれば省略可)
// 以下引数は$option=searchのときの使用する
// $filterColumn 検索する行、$filterType:どのような検索方法か、$word1:検索ワード１, $word2:検索ワード２.
function getAllData($option, $sortIndex, $sortType, $filterColumn=null, $filterType=null, $word1=null, $word2=null){
	include './global.php';
	// ソートの場合はソートのSQL追加.
	$sortSQL = "";
	if($sortIndex != ""){
		$sortSQL .= " order by ".$sortIndex." ";
		if($sortType == "desc"){
			$sortSQL .= " desc ";
		}
	}
	// フィルタをするときのSQL文.
	$filterSQL = " ";
	if($option == "search"){
		$filterSQL .=" where ";
		if($filterType == "contain"){
			$word1 = "%".$word1."%";
		}
		if(!(ctype_digit($word1) and ctype_digit($word2))){
			$word1 = "'".$word1."'";
			$word2 = "'".$word2."'";
		}
		switch($filterType){
			case "equal":
				$filterSQL .= $filterColumn." = ".$word1." ";
			break;
			case "contain":
				$filterSQL .= $filterColumn." like ".$word1." ";
			break;
			case "equalBig":
				$filterSQL .= $filterColumn." >= ".$word1." ";
			break;
			case "equalSmall":
				$filterSQL .= $filterColumn." <= ".$word1." ";
			break;
			case "between":
				$filterSQL .= " ".$filterColumn." between ".$word1." and ".$word2." ";
			break;
		}
	}
	try {
		// 接続
	    $pdo = new PDO($g_dbname);
	    // SQL実行時にもエラーの代わりに例外を投げるように設定
	    // (毎回if文を書く必要がなくなる)
	    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    // デフォルトのフェッチモードを連想配列形式に設定 
	    // (毎回PDO::FETCH_ASSOCを指定する必要が無くなる)
	    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		// 選択 (プリペアドステートメント)
		ChromePhp::log("SELECT * FROM ".$g_tableName." ".$filterSQL." ".$sortSQL);
	    $stmt = $pdo->prepare("SELECT * FROM ".$g_tableName." ".$filterSQL." ".$sortSQL);
	    $stmt->execute();
	    $r1 = $stmt->fetchAll();
	    //結果の出力
//	    header('Content-type: application/json');
		header("Content-Type: text/javascript; charset=utf-8");
		echo json_encode($r1);
//	    ChromePhp::log(json_encode($r1));
	} catch (Exception $e){
		echo $e->getMessage() . PHP_EOL;
	}
}
