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
var g_colNames = [
    "ID",
    "流動","管理No.","発行日","区分","No.","品番","Wlot","Mlot","異常内容",

    "原因","コメント","担当","提出日","担当","提出日","期限","室長承認",
    "受付日","担当","期限","可否","承認",

    "last_edit"
    ];
var g_colNamesIndex = [
    "id",
    "ryuudou","kanriNo","hakkoubi","kubun","ijo_No","hinban","Wlot","Mlot","ijounaiyou",
    "seigi_genin","seigi_comento","seigi_tantou1","seigi_teisyutubi1","seigi_tantou2","seigi_teisyutubi2","seigi_kigen","seigi_syounin",
    "hinkan_uketukebi","hinkan_tantou","hinkan_kigen","hinkan_kahi","hinkan_syounin",
    "last_edit"
]
var g_colModel =[
    {name:g_colNamesIndex[0], index:g_colNamesIndex[0], hidden: true},

    {name:g_colNamesIndex[1], index:g_colNamesIndex[1], width:100,fixed:true,editable:true, edittype:'select' , editoptions:{value:'ok:ok;ng:ng'}},
    {name:g_colNamesIndex[2], index:g_colNamesIndex[2], width:100,fixed:true,editable:true, editrules:{integer:true}},
    {name:g_colNamesIndex[3], index:g_colNamesIndex[3], width:100,fixed:true,editable:true, editoptions:g_datePicker},
    {name:g_colNamesIndex[4], index:g_colNamesIndex[4], width:100,fixed:true,editable:true},
    {name:g_colNamesIndex[5], index:g_colNamesIndex[5], width:100,fixed:true,editable:true, editrules:{integer:true}},
    {name:g_colNamesIndex[6], index:g_colNamesIndex[6], width:100,fixed:true,editable:true, editrules:{integer:true}},
    {name:g_colNamesIndex[7], index:g_colNamesIndex[7], width:100,fixed:true,editable:true},
    {name:g_colNamesIndex[8], index:g_colNamesIndex[8], width:100,fixed:true,editable:true},
    {name:g_colNamesIndex[9], index:g_colNamesIndex[9], width:100,fixed:true,editable:true,edittype:"textarea",editoptions: {rows:10, cols: 10 }},

    {name:g_colNamesIndex[10], index:g_colNamesIndex[10], width:100,fixed:true,editable:true,editoptions: {rows:10, cols: 10 }},
    {name:g_colNamesIndex[11], index:g_colNamesIndex[11], width:100,fixed:true,editable:true,edittype:"textarea",editoptions: {rows:10, cols: 10 }},
    {name:g_colNamesIndex[12], index:g_colNamesIndex[12], width:100,fixed:true,editable:true},
    {name:g_colNamesIndex[13], index:g_colNamesIndex[13], width:100,fixed:true,editable:true, editoptions:g_datePicker},
    {name:g_colNamesIndex[14], index:g_colNamesIndex[14], width:100,fixed:true,editable:true},
    {name:g_colNamesIndex[15], index:g_colNamesIndex[15], width:100,fixed:true,editable:true, editoptions:g_datePicker},
    {name:g_colNamesIndex[16], index:g_colNamesIndex[16], width:100,fixed:true,editable:true, editoptions:g_datePicker},
    {name:g_colNamesIndex[17], index:g_colNamesIndex[17], width:100,fixed:true,editable:true},

    {name:g_colNamesIndex[18], index:g_colNamesIndex[18], width:100,fixed:true,editable:true, editoptions:g_datePicker},
    {name:g_colNamesIndex[19], index:g_colNamesIndex[19], width:100,fixed:true,editable:true},
    {name:g_colNamesIndex[20], index:g_colNamesIndex[20], width:100,fixed:true,editable:true, editoptions:g_datePicker},
    {name:g_colNamesIndex[21], index:g_colNamesIndex[21], width:100,fixed:true,editable:true, edittype:'select' , editoptions:{value:'ok:ok;ng:ng'}},
    {name:g_colNamesIndex[22], index:g_colNamesIndex[22], width:100,fixed:true,editable:true},

    {name:g_colNamesIndex[23], index:g_colNamesIndex[23], hidden: true},
];
