// 日付用
var g_datePicker ={
    size:20,
    dataInit:function(el){ 
        $(el).datepicker({dateFormat:'yy-mm-dd'});  //datepickerの生成
    }, 
    defaultValue: function(){      //デフォルトの値を現在の日付にする
        var currentTime = new Date();
        var month = parseInt(currentTime.getMonth() + 1);
        month = month <= 9 ? "0"+month : month; var day = currentTime.getDate();
        day = day <= 9 ? "0"+day : day;
        var year = currentTime.getFullYear();
        return year+"-"+month + "-"+day;
    }
};

var g_columnConfig=[];  // columnConfig.jsonと同じ.
var g_colNames=[];      // 列の名前.
//var g_colNamesIndex=[];
var g_colModel = [];    // 列の設定.
// ajaxでデータベースの項目設定を取得する関数を返す（g_columnConfigの設定）
function getColumnConfigAjax(){
    var result = $.ajax({
        type:"get",
        url:"db/columnConfig.json",
        dataType:"json",
        async: false,
        success:function(res){
            g_columnConfig = res;
        },
        error:function(){
            alert("ajax失敗");
        }
    });
    return result;
}
// 色々設定（g_colNames,g_colModelの設定）.
function colConfig(){
//    console.info(g_columnConfig);
    g_columnConfig.forEach(function(currentValue,index,array){
        // colNamesの設定.
        g_colNames.push(currentValue.yomi);
        // colModelの設定.
        // 共通の設定.
//        console.info(currentValue.typeOption.additionalType);
        var pushData = {name:currentValue.name, index:currentValue.name, width:100,fixed:true,editable:true};
        if(currentValue.typeOption.additionalType==="date"){   // 日付.
            pushData.editoptions = g_datePicker;
        }else if(currentValue.typeOption.additionalType==="list"){ //リスト.
            pushData.edittype='select';
            ////////////////
            // todo　リストの内容が反映されるように修正する.
            ////////////////
            pushData.editoptions={value:':;ok:ok;ng:ng'};
        }else if(currentValue.typeOption.additionalType==="textarea"){//テキストエリア.
            pushData.edittype="textarea";
            pushData.editoptions= {rows:10, cols: 10 };
        }else if(currentValue.type === "int"){//Int.
            pushData.editrules={integer:true};
        }else if(currentValue.type === "string"){//String
        }
        // カラムを隠すか.
        if(currentValue.isHidden === "true"){
            pushData.hidden = true;
        }
        g_colModel.push(pushData);
    });
};

getColumnConfigAjax();
colConfig();

//あとで削除する.
var g_colNamesIndex = [
    "id",
    "ryuudou","kanriNo","hakkoubi","kubun","ijo_No","hinban","Wlot","Mlot","ijounaiyou",
    "seigi_genin","seigi_comento","seigi_tantou1","seigi_teisyutubi1","seigi_tantou2","seigi_teisyutubi2","seigi_kigen","seigi_syounin",
    "hinkan_uketukebi","hinkan_tantou","hinkan_kigen","hinkan_kahi","hinkan_syounin",
    "last_edit"
]