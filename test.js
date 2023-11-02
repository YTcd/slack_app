function notiTest(){
    const block2 = voteBlockGenerator.makeVoteBlock(COFFEELIST);
  
    sheetHandler.updateRecentVoteBlock(block2);
    messageHandler.postMessage(TEST_CHANNEL_ID,"",block2);
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
  
  function modelTest(){
    model.init();
    model.setBlock(3);
    model.setSome("ad");
    model.syncUsedData();
  }
  
  // 순서 : SpreadsheetApp.openByUrl > setValue > getRange > getSheetByName > getValue 순으로 느림
  function delayTest1(){
  const startTime = Date.now();
  const sheet = SpreadsheetApp.openByUrl(SPRITESHEETLINK);
    //const model = sheet.getSheetByName("모델");
    //const recentVoteBlockRange = model.getRange(1,2,1,1);
  for(let i = 0; i<1000; i++){
    const sheet = SpreadsheetApp.openByUrl(SPRITESHEETLINK);
    //const recentVoteBlockRange = model.getRange(1,2,1,1);
    //const a = recentVoteBlockRange.getValue();
    //recentVoteBlockRange.setValue(i);
  }
  Logger.log(Date.now() - startTime);
  }