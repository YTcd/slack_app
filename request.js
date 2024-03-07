// windmill 통한 스케줄 요청은 doGet 함수를 실행
function doGet(e) {
  if (e && e.parameter && e.parameter.schedule) {
    switch (e.parameter.schedule) {
      case "coffee":
        coffeeNoti();
        break;
      case "birthday":
        bitrhdayNotify();
        break;
      case "monthlyBiz":
        monthlyBizNoti();
        break;
      case "clearVote":
        clearVotingLog();
        break;
      case "workFromHome":
        workFromHomeNotify();
        break;
      case "workFromHomeReminder":
        workFromHomeReminder();
        break;
      case "dailyWorkUpdate":
        dailyWorkUpdateNoti();
        break;
    }
  }
}

// 모든 슬랙 API 요청이 doPost 함수를 실행
function doPost(e) {
  try {
    if (e && e.parameter && e.parameter.command) {
      onCommand(e);
    } else if (e && e.parameter && e.parameter.payload) {
      let payload = JSON.parse(e.parameter.payload);
      onButtonClicked(payload.actions[0].value, payload);
    }
    return ContentService.createTextOutput(JSON.stringify()).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (er) {
    messageHandler.postMessage(
      TEST_CHANNEL_ID,
      "",
      JSON.stringify(
        blockGenerator.getBlockWithDeleteButton(
          "catch Error" + JSON.stringify(err)
        )
      )
    );
    return ContentService.createTextOutput(JSON.stringify()).setMimeType(
      ContentService.MimeType.JSON
    );
  }
}

// /로 시작하는 커맨드를 실행 했을때
function onCommand(e) {
  switch (e.parameter.command) {
    case "/metavote":
      voting.voteStart(e);
      break;
    case "/go":
      dampiGo(e);
      break;
    case "/checkseason":
      seasonalAssetCheck.showCheckSeasonlMenu(e.parameter);
      break;
    case "/clearVote":
      sheetHandler.clearRecentVoteBlock();
      break;
  }
}

function onButtonClicked(value, payload) {
  const messageId = payload.container.message_ts;
  const channelID = payload.channel.id;
  if (value == "delete") {
    messageHandler.deleteMessage(channelID, messageId);
    sheetHandler.clearRecentVoteBlock();
  }

  if (value && value.indexOf("vote_0") != -1) {
    voting.updateVotesReceived(payload);
  }

  if (value == "addItem") {
    voting.addVoteItem(payload);
  }

  if (value == "leGo" || value == "cantGo" || value == "waitASec") {
    smoke.updateBlock(payload, value);
  }

  if (value == "seasonalAssetCheck") {
    seasonalAssetCheck.checkSeasonalList(payload);
  }
}
