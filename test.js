function notiT(){
  var today = new Date();

// GMT+09:00 시간대 설정
today.setHours(today.getHours() + 9);

// 월과 일을 MMdd 형식으로 가져오기
var month = (today.getUTCMonth() + 1).toString().padStart(2, '0');
var day = today.getUTCDate().toString().padStart(2, '0');

// 결과 출력
var result = month + day;
Logger.log(result);
}

const test = [
{
  type: "section",
  text: { type: "mrkdwn", text: "a" },
  accessory: {
    type: "button",
    text: { type: "plain_text", text: "메시지 삭제" },
    style: "primary",
    value: "delete_confirm",
  },
}
];

function ad(){
  Logger.log(JSON.stringify(voteLogSheet.getLastRow()));
}

// 순서 : SpreadsheetApp.openByUrl > setValue > getRange > getSheetByName > getValue 순으로 느림
function delayTest1(){
const startTime = Date.now();
const sheet = SpreadsheetApp.openByUrl(SPRITESHEETLINK);
for(let i = 0; i<1000; i++){
  const sheet = SpreadsheetApp.openByUrl(SPRITESHEETLINK);
}
Logger.log(Date.now() - startTime);
}