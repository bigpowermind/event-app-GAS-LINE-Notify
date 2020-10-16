//スプレッドシートの内容を取得
function postContent() {
  //1. 現在のスプレッドシートを取得
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  //2. 現在のシートを取得
  var sheet = spreadsheet.getActiveSheet();
  
  //最後の行を取得（繰り返し処理の回数）
  var last_row = sheet.getLastRow();
  //処理を開始する行（１行目は項目のため2行目から開始）
  var begin_row = 2;
  
  //今日の日付を取得し文字列を成型
  var today = new Date();
  var formatDate = Utilities.formatDate(today, "JST","yyyy/MM/dd");
  
  //繰り返し処理(1行づつ処理し、行の数だけ繰り返す)
  for(var i = begin_row; i <= last_row; i++) {
   //それぞれのセルの中身を取得していく
    //日付
    var sell1 = "A"+i;
    var value1 = sheet.getRange(sell1).getValue();
    var value1 = Utilities.formatDate(value1, "JST","yyyy/MM/dd");
    
    //予定
    var sell2 = "B"+i;
    var value2 = sheet.getRange(sell2).getValue();
    
    //準備期間
    var sell3 = "C"+i;
    var value3 = sheet.getRange(sell3).getValue();
    //メモ
    var sell4 = "D"+i;
    var value4 = sheet.getRange(sell4).getValue();
    
    //項目名とvalue2-4をまとめて変数で取得
    var value = "\n【予定】" + value2 + "\n【準備期間】" + value3 + "\n【メモ】" + value4;
    
    //もし、日付と実際の日付が合致した際、LINEを送る
    if(formatDate == value1) {
      sendPostContent(value);
    }
  }
}


//GASからLINE Notifyに通知するメソッド
function sendPostContent(value) {
  var token = ['ここにLINE Notifyのアクセストークンを記載'];
  var options = {
    "method": "post",
    "payload" : {"message": value },
    "headers": {"Authorization": "Bearer " + token}    
  };
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}
