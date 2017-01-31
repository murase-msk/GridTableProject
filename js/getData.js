/*eslint no-console: 1*/
/* global g_colNamesIndex, */

"use strict";

//Main Function
$(function(){
    var grid = $("#list");
    var event = new Event(grid);
    event.addListener();

    var lastSel;
    ////////////////////////////////////
    /////////////jqGrid/////////////////
    ////////////////////////////////////
    grid.jqGrid({
        // オプション設定
        url: "php/getDataFromDB.php?option=aaa",
//        editurl: "php/phpsv.php",
//                data: resultData,
        //データの種別
        datatype: "json",
        //列の表示名
        colNames:g_colNames,
        // バリデーション.
        //http://www.trirand.com/jqgridwiki/doku.php?id=wiki%3acommon_rules#editrules
        //列ごとの設定
        colModel:g_colModel,
        // 複数行選択.
        multiselect: false, 
//        sortable:true,  // ドラックドロップでソート可能か?.
        // ページング //footerのページャー要素のid
        pager : 'pager1', 
        // onPaging:function(pgButton){
        //     console.log(pgButton);
        // },
        //一ページに表示する行数
        rowNum : 20,
        //一度にデータを読み込む.
        loadonce: false,
        //高さ
        height: $(window).height() * 0.6,
        //幅
        width: $(window).width() * 0.9,
        // 幅を自動で変えるか
        autowidth:false,
        // キャプション.
        caption: 'テスト表示',
        //画面サイズに依存せず固定の大きさを表示する設定
        shrinkToFit : true,
         //footerの右下に表示する。
        viewrecords: true,
        //リージョン 日本語
        regional : 'ja2',
        // treeGrid,subGrid,afterInsertRowを使わないならtrueをセットして高速化する.
        gridview: true, 
        // Webサーバからデータを取得.
        jsonReader: {
            id: "Id",
            root: function (obj) { return obj; },
            page: function (obj) { return obj; },
            total: function (obj) { return obj; },
            records: function (obj) { return obj.length; },
            sort: function (obj) {return obj;},
            repeatitems: false,
        },
//    pgbuttons : false,
//    viewrecords : false,
//    pgtext : "",
//    pginput : false,
        // 行をダブルクリックしたときの処理.
        ondblClickRow: function(rowid) {
            event.editSelectedRecord(rowid);
        },
        //行を選択したときの処理.
        onSelectRow: function(id){
            // 選択行と違う行を選択したとき.
            if (id && id!==lastSel){
                // 選択していた行が編集中であるか.
                if($("#"+lastSel).attr("editable")==1){
                    // ダイアログをモーダルウィンドウで表示.
                    $( "#dialog" ).dialog({
                        modal: true,
                        buttons: {
                           "OK": function(){
                                $(this).dialog('close');
                            }
                        }
                    });
                    //選択行を変えない.
                    grid.jqGrid("setSelection",lastSel);
                }else{
                    //grid.restoreRow(lastSel);
                    lastSel=id;
                }
            }
        },
        error:function(){
            console.log('取得に失敗しました。');
        }
    });

    //マルチコラム
    grid.jqGrid("setGroupHeaders",{
        useColSpanStyle:true,
        groupHeaders:[
            {startColumnName:'seigi_genin', numberOfColumns:8, titleText:"生技"},
            {startColumnName:'hinkan_uketukebi', numberOfColumns:5, titleText:"品管"}
        ]
    });
    // 特定の列にタグをつける(ヘッダの色を変える).
    // grid.jqGrid("setLabel", 1, false, "test_id-header");
    // grid.jqGrid("setLabel", 2, false, "test_multi-header");
    // grid.jqGrid("setLabel", 3, false, "test_list-header");
    // grid.jqGrid("setLabel", 4, false, "test_name-header");
    // grid.jqGrid("setLabel", 5, false, "test_date-header");

    grid.jqGrid("setLabel", 10, false, "css_yellow");
    grid.jqGrid("setLabel", 11, false, "css_pink");


    
    /////////////////////////////////
    ////////////フィルター関係////////
    /////////////////////////////////
    // プルダウンリストの作成.
    var colNamesList = grid.getGridParam("colNames");
    var colModelList = grid.getGridParam("colModel");
    for(var i=1; i<colNamesList.length; i++){
        $("[name='columnList']").append("<option value="+colModelList[i].name+">"+colNamesList[i]+"</option>");
    }
    // 検索行プルダウンのイベント.
    // テキストボックスをdatepickerにするか.
    $("[name='columnList']").change(function(){
        // プルダウンメニューのインデックスを取得.
        var filteredObject = g_columnConfig.filter(function(item,index){
            if(item.name === $("[name='columnList'] option:selected").attr("value")) return true;
        });
        // date型であるか.
        if(filteredObject[0].typeOption && filteredObject[0].typeOption.additionalType && filteredObject[0].typeOption.additionalType ==="date"){
            $(".word").datepicker({dateFormat:'yy-mm-dd'});
        }else{
            $(".word").datepicker("destroy");
        }
    });
    // フィルターのプルダウン変更イベント.
    $("[name='filterList']").change(function(){
        // 間のときはテキストボックス２つ.
        if($("[name='filterList'] option:selected").attr("value") == "between"){
            $("[name='word2']").show();
        }else{
            $("[name='word2']").hide();
        }
    });

    // 列隠しラジオボタン切り替え.
        //////
        //////todo: g_colNamesIndexを使わないようにする
        //////
    $('[name=hiddenColumn]:radio').change(function() {
        if ($("input[value='all']").prop('checked')) {
            var tmp = [];
            for(var i=1; i<g_colNamesIndex.length; i++){
                tmp.push(g_colNamesIndex[i]);
            }
            grid.jqGrid("showCol",tmp);
            grid.jqGrid("setGridParam", {width:500});
        } else if($("input[value='seigi']").prop('checked')) {
            var tmp1 = [];
            var tmp2 = [];
            for(var i=18; i<23; i++) tmp1.push(g_colNamesIndex[i]);
            for(var i=10; i<18; i++) tmp2.push(g_colNamesIndex[i]);
            grid.jqGrid("hideCol",tmp1);
            grid.jqGrid("showCol",tmp2);
        }else{
            var tmp1 = [];
            var tmp2 = [];
            for(var i=18; i<23; i++) tmp2.push(g_colNamesIndex[i]);
            for(var i=10; i<18; i++) tmp1.push(g_colNamesIndex[i]);
            grid.jqGrid("hideCol",tmp1);
            grid.jqGrid("showCol",tmp2);
        }
        grid.jqGrid("setLabel", 10, false, "css_yellow");
        grid.jqGrid("setLabel", 11, false, "css_pink");
        grid.setGridWidth($(window).width() * 0.9)
            .setGridHeight($(window).height() * 0.6);
    });

    // リサイズイベント.
    $(window).bind('resize', function () {
        grid.setGridWidth($(window).width() * 0.9)
            .setGridHeight($(window).height() * 0.6);
    }).trigger('resize');


    event.updatePager();
    
    //デザイン
    // 2button／buttonsetメソッドでボタンに整形
    $('button').button();
    
    //ページを表示した時間を記録しておく.
    event.documentReadyTime = ""+event.getDateFormat();
//    console.log(getDateFormat());
});



