
var grid = $("#list");

// 新規の行追加
function addNewRecord(){
    var addparameters ={
//        rowID : "new_row",
        initdata : {},
        position :"first",
        useDefValues : false,
        useFormatter : false,
        addRowParams : {extraparam:{}}
    }
    var rtn = grid.jqGrid("addRow",addparameters);
    //var rtn = grid.addRowData(undefined,addparameters);
    // if( rtn )
    //     alert("追加成功");
    // else
    //     alert("追加失敗");
}

//インライン編集.
function editSelectedRecord(){
    var id = grid.getGridParam("selrow");
    // http://www.trirand.com/jqgridwiki/doku.php?id=wiki:inline_editing
    // editRow(rowid, keys, oneditfunc, successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc);
    // rowid: 編集している行
    // keys: Enterで保存　ESCでキャンセルできる
    // oneditfunc.
    var editparameters = {
        "keys" : false,
        "oneditfunc" : null,
        "successfunc" : null,
        "url" : null,
        "extraparam" : {},
        "aftersavefunc" : null,
        "errorfunc": null,
        "afterrestorefunc" : null,
        "restoreAfterError" : true,
        "mtype" : "POST"
    }
    grid.editRow(id, editparameters);
}

// 保存.
function saveSelectedRecord(){
    var id = grid.getGridParam("selrow");
    var saveparameters = {
        "successfunc" : null,
        "url" : "php/saveData.php",
        "extraparam" : {type:"save"},
        "aftersavefunc" : null,
        "errorfunc": function(){
            alert("保存失敗");
        },
        "afterrestorefunc" : null,
        "restoreAfterError" : true,
        "mtype" : "POST"
    }
    grid.saveRow(id, saveparameters);
}

// 選択行の削除.
function deleteSelectedRecord(){
    var id = grid.getGridParam("selrow");
    if(id){
        var deleteData = grid.getRowData(id);
        deleteData.type = "delete";
        console.log(grid.getRowData(id));
        $.ajax({
            // ajax設定
            type: 'POST',
            scriptCharset: 'utf-8',
            url: "php/deleteData.php",
            data:deleteData,
            success: function(res){
                var rtn = grid.delRowData(id);
                if(rtn){
                    alert("削除成功");
                }else{
                    alert("削除失敗");
                }
            },
            error: function(){
                alert("削除失敗");
            }
        });
    }
    else{
        alert("選択されてません");
    }
}

// 指定のワードを検索.
function searchRecord(option){
    // リセットかどうか.
    if(option != undefined && option.reset == true){
        grid.jqGrid("setGridParam",{url:"php/getDataFromDB.php?option=aaa"}).trigger("reloadGrid");
        return;
    }
    // どの行について検索するか.
    var searchColumn = $("[name='columnList']").val();
    // 検索方法.
    var searchType = $("[name='filterList']").val();
    var word1 = $("[name='word1']").val();
    var word2 = $("[name='word2']").val();
    var option = "columnList="+searchColumn+"&filterList="+searchType+"&word1="+word1+"&word2="+word2+""
    grid.jqGrid("setGridParam",{url:"php/getDataFromDB.php?option=search&"+option+""}).trigger("reloadGrid");
}

//
var resultData={}
$(function(){
    var lastSel;
    ////////////////////////////////////
    /////////////jqGrid/////////////////
    ////////////////////////////////////
    grid.jqGrid({
        // オプション設定
        url: "php/getDataFromDB.php?option=aaa",
//        editurl: "php/phpsv.php",
//                data: resultData,
        datatype: "json",//データの種別
        colNames:g_colNames,//列の表示名
        // バリデーション.
        //http://www.trirand.com/jqgridwiki/doku.php?id=wiki%3acommon_rules#editrules
        colModel:g_colModel,//列ごとの設定
        multiselect: false,  // 複数行選択.
//        sortable:true,  // ドラックドロップでソート可能か?.
        pager : 'pager1', // ページング //footerのページャー要素のid
        rowNum : 100,//一ページに表示する行数
        height: $(window).height() * 0.6,//高さ
        width: $(window).width() * 0.9,//幅
        autowidth:false,     // 幅を自動で変えるか
        shrinkToFit:false,  // 自動で小さくするか
        caption: 'テスト表示',
        shrinkToFit : true,       //画面サイズに依存せず固定の大きさを表示する設定
        viewrecords: true,             //footerの右下に表示する。
        regional : 'ja2',               //日本語
        gridview: true, // treeGrid,subGrid,afterInsertRowを使わないならtrueをセットして高速化する.
        // 行をダブルクリックしたときの処理.
        ondblClickRow: function(rowid) {
            editSelectedRecord(rowid);
        },
        // 行を選択したときの処理.
        onSelectRow: function(id){
            if (id && id!==lastSel){
                grid.restoreRow(lastSel);
                lastSel=id;
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
    // // フィルター.
    // var options = {};
    // grid.jqGrid('filterToolbar',options);

    // 特定の列にタグをつける(ヘッダの色を変える).
    // grid.jqGrid("setLabel", 1, false, "test_id-header");
    // grid.jqGrid("setLabel", 2, false, "test_multi-header");
    // grid.jqGrid("setLabel", 3, false, "test_list-header");
    // grid.jqGrid("setLabel", 4, false, "test_name-header");
    // grid.jqGrid("setLabel", 5, false, "test_date-header");

    grid.jqGrid("setLabel", 10, false, "css_yellow");
    grid.jqGrid("setLabel", 11, false, "css_pink");


    // ボタンイベント処理
    $("#addNewRecord").click(function(e){
        addNewRecord();
    });
    $("#editSelectedRecord").click(function(e){
        editSelectedRecord();
    });
    $("#saveSelectedRecord").click(function(e){
       saveSelectedRecord()
    });
    $("#deleteSelectedRecord").click(function(e){
       deleteSelectedRecord()
    });
    $("#searchRecord").click(function(e){
        searchRecord();
    });
    $("#resetFilter").click(function(e){
        searchRecord({reset:true});
    });
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
    $("[name='columnList']").change(function(){
        // テキストボックスをdatepickerにするか.
        if($("[name='columnList'] option:selected").attr("value") == g_colNamesIndex[3]){
            $(".word").datepicker({dateFormat:'yy-mm-dd'});
        }else{
            $(".word").datepicker( "option", "disabled", true );
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

    //デザイン
    // 2button／buttonsetメソッドでボタンに整形
    $('button').button();
    
});


