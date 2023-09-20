function coffeeNoti(){
    const block1 = sheetHandler.getCoffeeBlock();
    const block2 = voteBlockGenerator.makeVoteBlock(["커피","아아","뜨아","콜드브루","아샷추","아이스라떼"]);

    sheetHandler.updateRecentVoteBlock(JSON.stringify(block1));
    messageHandler.postMessage(META_CHANNEL_ID,"",block2);
}

//목요일 공지
function notifyToSlack1() {
    triggerSlackRequest("재택", "금주 재택 신청하세요.");
}

//금요일 트리거 공지
function notifyToSlack2() {
    triggerSlackRequest("재택진행중", "재택 근무 보고서 작성해주세요");
}

//slack에 요청
function triggerSlackRequest(type, msg) {
    var payload;
    switch (type) {
        case "재택":
            payload = buildJTPayload(msg);
            break;
        case "재택진행중":
            payload = buildJTingPayload(msg);
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

//재택 도중 알림 payload 생성
function buildJTingPayload(msg) {
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
