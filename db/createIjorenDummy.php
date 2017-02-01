<?php

$fp = fopen('ijorenDummy.csv', 'a');

for($i=0; $i<10000000; $i++){
    // 一行分のデータ.
    $oneDataArray=array();
    array_push($oneDataArray,$i,
    rb(),rn(),rd(),rt(),rn(),rn(),rl(),rl(),rt(),
    rt(),rt(),rname(),rd(),rname(),rd(),rd(),rt(),
    rd(),rname(),rd(),rb(),rt(),
    "2016-12-19 20:15:54"
    );

    if($i%1000 == 0){
        var_dump("processing...".$i);
    }

    $line = implode(',' , $oneDataArray);
    fwrite($fp, $line . "\n");
}

fclose($fp);


// ランダムな日付を出力. randomDate
function rd(){
    date_default_timezone_set('UTC');
    $start = strtotime('2006-01-01'); // 0
    $end = strtotime('2016-12-31'); // 2147483647
    return date('Y-m-d', mt_rand($start, $end));
}
// 0から$randMaxまでの数値の乱数を返す. randomNumber
function rn(){
    $pw = mt_rand(0,999);
    return $pw;
}
//ランダムな文字列 randomText.
function rt($length = 8)
{
    return array_reduce(range(1, $length), function($p){ return $p.str_shuffle('1234567890abcdefghijklmnopqrstuvwxyz')[0]; });
}
// ランダムな品番 randomHinban
//616000~616010
function rh(){
    return "6160".randomNumber(0,9).randomNumber(0,9);
}
// ランダムなロット.randomLot
//AA00~ZZ99
function rl(){
    return "".makeRandStrCapital(1).makeRandStrCapital(1).randomNumber(0,9).randomNumber(0,9);
}

//ランダムな2値. randomBool
//ok ng
function rb(){
    $bool = randomNumber(0,1);
    if($bool == 1){
        return "ok";
    }else{
        return "ng";
    }
}

//ランダムな名前 randomName
//'佐藤','鈴木','高橋','田中','伊藤','渡辺','山本','中村','小林',加藤
function rname(){
    $nameArray = array('佐藤','鈴木','高橋','田中','伊藤','渡辺','山本','中村','小林','加藤');
    $num = randomNumber(0,9);
    return $nameArray[$num];
}


function randomNumber($aMin=0,$aMax=9){
    $pw = mt_rand($aMin,$aMax);
    return $pw;
}

// ランダムな大文字.
function makeRandStrCapital($length=1) {
    $str = array_merge(range('A', 'Z'));
    $r_str = null;
    for ($i = 0; $i < $length; $i++) {
        $r_str .= $str[rand(0, count($str) - 1)];
    }
    return $r_str;
}
// /**
//  * ランダム文字列生成 (英数字)
//  * $length: 生成する文字数
//  */
// function makeRandStr($length) {
//     $str = array_merge(range('a', 'z'), range('0', '9'), range('A', 'Z'));
//     $r_str = null;
//     for ($i = 0; $i < $length; $i++) {
//         $r_str .= $str[rand(0, count($str) - 1)];
//     }
//     return $r_str;
// }
