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
    "受付日","担当","期限","可否","承認"
    ];
var g_colNamesIndex = [
    "id","ryuudou","kanriNo","hakkoubi","kubun","ijo_No","hinban","Wlot","Mlot","ijounaiyou",
    "seigi_genin","seigi_comento","seigi_tantou1","seigi_teisyutubi1","seigi_tantou2","seigi_teisyutubi2","seigi_kigen","seigi_syounin",
    "hinkan_uketukebi","hinkan_tantou","hinkan_kigen","hinkan_kahi","hinkan_syounin"
]
var g_colModel =[
    {name:'id', index:"id", editable: true, hidden: true},
    {name:'ryuudou', index:'ryuudou',width:100,fixed:true,editable:true, edittype:'select' , editoptions:{value:'ok:ok;ng:ng'}},
    {name:'kanriNo', index:"kanriNo", width:100,fixed:true,editable:true, editrules:{integer:true}},
    {name:'hakkoubi', index:"hakkoubi", width:100,fixed:true,editable:true, editoptions:g_datePicker},
    {name:'kubun', index:"kubun", width:100,fixed:true,editable:true},
    {name:'ijo_No', index:"ijo_No",  width:100,fixed:true,editable:true, editrules:{integer:true}},
    {name:'hinban', index:"hinban", width:100,fixed:true,editable:true, editrules:{integer:true}},
    {name:'Wlot', index:"Wlot", width:100,fixed:true,editable:true},
    {name:'Mlot', index:"Mlot", width:100,fixed:true,editable:true},
    {name:'ijounaiyou', index:"ijounaiyou", width:100,fixed:true,editable:true},

    {name:'seigi_genin', index:"seigi_genin", width:100,fixed:true,editable:true},
    {name:'seigi_comento', index:"seigi_comento", width:100,fixed:true,editable:true},
    {name:'seigi_tantou1', index:"seigi_tantou1", width:100,fixed:true,editable:true},
    {name:'seigi_teisyutubi1', index:"seigi_teisyutubi1", width:100,fixed:true,editable:true, editoptions:g_datePicker},
    {name:'seigi_tantou2', index:"seigi_tantou2", width:100,fixed:true,editable:true},
    {name:'seigi_teisyutubi2', index:"seigi_teisyutubi2", width:100,fixed:true,editable:true, editoptions:g_datePicker},
    {name:'seigi_kigen', index:"seigi_kigen", width:100,fixed:true,editable:true, editoptions:g_datePicker},
    {name:'seigi_syounin', index:"seigi_syounin", width:100,fixed:true,editable:true},

    {name:'hinkan_uketukebi', index:"hinkan_uketukebi", width:100,fixed:true,editable:true, editoptions:g_datePicker},
    {name:'hinkan_tantou', index:"hinkan_tantou", width:100,fixed:true,editable:true},
    {name:'hinkan_kigen', index:"hinkan_kigen", width:100,fixed:true,editable:true, editoptions:g_datePicker},
    {name:'hinkan_kahi', index:'hinkan_kahi', width:100,fixed:true,editable:true, edittype:'select' , editoptions:{value:'ok:ok;ng:ng'}},
    {name:'hinkan_syounin', index:"hinkan_syounin", width:100,fixed:true,editable:true},


    // {name:'test_id', index:"test_id", editable: true, editrules:{integer:true}},
    // {name:'test_name', index:"test_name", editable: true},
    // {name:'test_date', index:"test_date", editable: true, editoptions:{g_datePicker}},
    // {name:'test_list', index:'test_list', editable:true, edittype:'select' , editoptions:{value:'ok:ok;ng:ng'}}
];
