/*eslint no-console: 1*/
/*eslint no-unused-vars: 1*/
/* global  */

"use strict";

function Event(grid){
//export default class Event{

  //constructor(grid){
    this.documentReadyTime = null;
    this.grid = grid;
    // 検索条件.
    this.searchOption = "";
}

// イベントの追加.
Event.prototype.addListener = function(){
  let myThis = this;
  // ボタンイベント処理
  // 追加.
  $("#addNewRecord").click(function(){
    myThis.addNewRecord();
  });
  //編集.
  $("#editSelectedRecord").click(function(){
    myThis.editSelectedRecord();
  });
  //保存.
  $("#saveSelectedRecord").click(function(){
    myThis.saveSelectedRecord();
  });
  //削除.
  $("#deleteSelectedRecord").click(function(){
    myThis.deleteSelectedRecord();
  });
  //更新.
  $("#reloadGrid").click(function(){
    myThis.reloadTable();
  });
  //取りやめ.
  $("#restoreSelectedRecord").click(function(){
    var id = myThis.grid.getGridParam("selrow");
    console.info(id);
    myThis.grid.restoreRow(id);
  });
  //検索.
  $("#searchRecord").click(function(){
    myThis.searchRecord();
  });
  //リセット.
  $("#resetFilter").click(function(){
    myThis.resetSearchResult();
  });
  ////////////////////////
  // フッターのボタンイベント.
  $("#first_page").click(function(){
    $("#now_page").val(1);
    myThis.grid.setGridParam({ page: 1 });
    myThis.updatePager();
    myThis.reloadTable();
  });
  $("#pre_page").click(function(){
    let nowPage = Number($("#now_page").val());
    $("#now_page").val(nowPage-1);
    myThis.grid.setGridParam({ page: nowPage-1 });
    myThis.updatePager();
    myThis.reloadTable();
  });
  $("#now_page").keypress(function(e){
    if(e.which==13){// エンターキーのイベント.
      myThis.grid.setGridParam({ page: $("#now_page").val()});
      myThis.updatePager();
      myThis.reloadTable();
    }
  });
  $("#next_page").click(function(){
    let nowPage = Number($("#now_page").val());
    $("#now_page").val(nowPage+1);
    myThis.grid.setGridParam({ page: nowPage+1 });
    myThis.updatePager();
    myThis.reloadTable();
  });
  $("#last_page").click(function(){
    $("#now_page").val( Math.floor(myThis.getTotalDataNum()/myThis.grid.getGridParam("rowNum")+1));
    let nowPage = Number($("#now_page").val());
    myThis.grid.setGridParam({ page: nowPage});
    myThis.updatePager();
    myThis.reloadTable();
  });
}

  // ページャーの表示.
Event.prototype.updatePager = function(){
  $("#total_data").text(""+this.getTotalDataNum());//＃＃＃＃＃＃＃遅いため場所移動＃＃＃＃検索・リセット・追加・最初のみ必要＃＃＃＃＃＃＃＃＃＃＃＃＃＃.
  $("#front_data").text(""+ ((Number($("#now_page").val())-1)*this.grid.getGridParam("rowNum")+1));
  $("#rear_data").text(""  +(Number($("#now_page").val())*this.grid.getGridParam("rowNum")));
}

  // 新規の行追加
Event.prototype.addNewRecord = function(){
  var addparameters ={
  //        rowID : "new_row",
      initdata : {},
      position :"first",
      useDefValues : false,
      useFormatter : false,
      addRowParams : {extraparam:{}}
  };
  var rtn = this.grid.jqGrid("addRow",addparameters);
  //var rtn = grid.addRowData(undefined,addparameters);
  // if( rtn )
  //     alert("追加成功");
  // else
  //     alert("追加失敗");
}

  //インライン編集.
  //var lastSelection;
Event.prototype.editSelectedRecord = function(){
  var id = this.grid.getGridParam("selrow");
  // http://www.trirand.com/jqgridwiki/doku.php?id=wiki:inline_editing
  // editRow(rowid, keys, oneditfunc, successfunc, url, extraparam, aftersavefunc,errorfunc, afterrestorefunc);
  // rowid: 編集している行
  // keys: Enter で保存,ESCでキャンセルできる
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
  };
  this.grid.editRow(id, editparameters);
}

  // 保存.
Event.prototype.saveSelectedRecord = function(){
  var id = this.grid.getGridParam("selrow");
  console.info(this);
  var saveparameters = {
      "successfunc" : null,
      "url" : "php/saveData.php",
      "extraparam" : {type:"save",open_time:this.documentReadyTime,last_edit:this.getDateFormat()},
      "aftersavefunc" : function(){
          // デバッグ時コメントアウト
  //            location.reload();
      },
      "errorfunc": function(){
          alert("他の人がデータを更新しました。更新してから変更内容を確認し、編集・保存をしてください");
      },
      "afterrestorefunc" : function(){
      },
      "restoreAfterError" : true,
      "mtype" : "POST"
  };
  this.grid.saveRow(id, saveparameters);
}

  // 選択行の削除.
Event.prototype.deleteSelectedRecord = function(){
  var mythis = this;
    var id = this.grid.getGridParam("selrow");
    if(id){
      var deleteData = this.grid.getRowData(id);
      deleteData.type = "delete";
      console.log(this.grid.getRowData(id));
      $.ajax({
        // ajax設定
        type: 'POST',
        scriptCharset: 'utf-8',
        url: "php/deleteData.php",
        data:deleteData,
        success: function(res){
          var rtn = mythis.grid.delRowData(id);
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

// テーブルの更新.
Event.prototype.reloadTable = function(){
  var requestText = (this.searchOption == "" ? "option=aaa" : "option=search&"+this.searchOption);
  this.grid.jqGrid("setGridParam",{url:"php/getDataFromDB.php?"+requestText}).trigger("reloadGrid");
  this.documentReadyTime = ""+this.getDateFormat();
  this.updatePager();
}

  // 指定のワードを検索.
Event.prototype.searchRecord = function(option){
  // どの行について検索するか.
  var searchColumn = $("[name='columnList']").val();
  // 検索方法.
  var searchType = $("[name='filterList']").val();
  var word1 = $("[name='word1']").val();
  var word2 = $("[name='word2']").val();
  this.searchOption = "columnList="+searchColumn+"&filterList="+searchType+"&word1="+word1+"&word2="+word2+"";
  this.reloadTable();

  //検索条件の表示.
  var filterQuery = "";
  filterQuery += $("[name='columnList'] option:selected").text();
  filterQuery += "が「";
  filterQuery += $("[name='word1']").val();
  filterQuery += "」"
  if($("[name='word2']").is(':hidden') == false){
    filterQuery += "と「"
    filterQuery += $("[name='word2']").val();
    filterQuery += "」の"
  }
  filterQuery += $("[name='filterList'] option:selected").text();
  $("#filterQuery").text(filterQuery);
}

// 検索結果のリセット.
Event.prototype.resetSearchResult = function(){
  this.searchOption = "";
  this.reloadTable();
  //検索条件の非表示.
  $("#filterQuery").text("");
}
  // 現在時刻日付を取得.
Event.prototype.getDateFormat = function(){
  var date=new Date(); 
  //年・月・日・曜日を取得する
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return ""+year+"-"+("0"+month).slice(-2)+"-"+("0"+day).slice(-2)+ " "+
      ("0"+hour).slice(-2)+":"+("0"+minute).slice(-2)+":"+("0"+second).slice(-2);
}

// 全データ数の取得.
Event.prototype.getTotalDataNum = function(){
  var totalDataNum = -1;// 全データ数.
  // 検索しているかどうか.
  var isSearch = ((this.searchOption == "") ? false:true);
  var option2 = ((isSearch==false)?"option2=aaa":"option2=search&");
    $.ajax({
        // ajax設定
        async:false,
        type: 'GET',
        scriptCharset: 'utf-8',
        url: "php/getDataFromDB.php?option=totalData&"+option2+this.searchOption,
        success: function(res){
            totalDataNum = res;
        }
    });
    return totalDataNum
}