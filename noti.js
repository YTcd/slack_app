function dailyWorkUpdateNoti() {
  dailyWorkUpdate.dailyNoti();
}

function workFromHomeReminder() {
  const biweekly = workFromHomeRange.getValue();
  if (biweekly == false) {
    return;
  }

  let block = blockGenerator.getWorkFromHomeRemiderBlock();
  messageHandler.postMessage(META_CHANNEL_ID, "", block);
}

function workFromHomeNotify() {
  workFromHomeNoti.notiWorkFromHome();
}

function bitrhdayNotify() {
  bitrhdayNoti.notiBirthDay();
}

function dampiGo(e) {
  let block = blockGenerator.getDamPiBlock(e);
  dampiBlockRange.setValue(JSON.stringify(block));
  messageHandler.postMessage(META_SMOKE_ID, "", block);
}

function coffeeNoti() {
  const block = blockGenerator.makeVoteBlock([
    "커피",
    "아아",
    "뜨아",
    "콜드브루",
    "아샷추",
    "아이스라떼",
  ]);

  sheetHandler.updateRecentVoteBlock(block);
  messageHandler.postMessage(META_CHANNEL_ID, "", block);
}

function monthlyBizNoti() {
  monthlyNoti.notiMonthly();
}

function clearVotingLog() {
  sheetHandler.clearRecentVoteBlock();
}

//목요일 재택 공지
function notifyToSlack1() {
  triggerSlackRequest("재택", "금주 재택 신청하세요.");
}

//slack에 요청
function triggerSlackRequest(type, msg) {
  var payload;
  switch (type) {
    case "재택":
      payload = buildJTPayload(msg);
      break;
  }

  var options = {
    method: "post",
    contentType: "application/json",
    muteHttpExceptions: true,
    payload: JSON.stringify(payload),
  };

  UrlFetchApp.fetch(META_WEBHOOK, options);
}

//재택 신청 알림 payload 생성
function buildJTPayload(msg) {
  return {
    channel: META_CHANNELNAME,
    text: msg,
    link_names: 1,
    attachments: [
      {
        text: "",
        color: "FFFFFF",
        actions: [
          {
            name: "groupware",
            text: "재택 신청",
            type: "button",
            url: "https://eapprove-doubleu.cloud-office.co.kr/approval/documentPicker.do",
          },
          {
            name: "spreadLink",
            text: "재택근무보고서",
            type: "button",
            url: "https://docs.google.com/spreadsheets/d/1PF15XSOzxppYCvHebxYS5PtFxsrDuqb5QQFPuQnPihA",
          },
        ],
      },
    ],
  };
}
