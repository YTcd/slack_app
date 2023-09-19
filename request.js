//모든 API 요청이 doPost 함수를 실행
function doPost(e) {
    try {
        if (e && e.parameter && e.parameter.command) {
            onCommand(e);
        } else if (e && e.parameter && e.parameter.payload) {
            let payload = JSON.parse(e.parameter.payload);
            onButtonClicked(payload.actions[0].value, payload);
        }
        return ContentService.createTextOutput(JSON.stringify()).setMimeType(ContentService.MimeType.JSON);
    } catch (er) {
        messageHandler.postMessage(TEST_CHANNEL_ID,"",JSON.stringify(voteBlockGenerator.getBlockWithDeleteButton("catch Error")));
        return ContentService.createTextOutput(JSON.stringify()).setMimeType(ContentService.MimeType.JSON);
    }
}

// /로 시작하는 커맨드를 실행 했을때
function onCommand(e) {
    switch (e.parameter.command) {
        case "/metavote":
            voting.voteStart(e);
            break;
    }
}

function onButtonClicked(value, payload) {
    const messageId = payload.container.message_ts;
    const channelID = payload.channel.id;
    if(value == "delete"){
        messageHandler.deleteMessage(channelID,messageId);
        sheetHandler.clearRecentVoteBlock();
    }

    if(value && value.indexOf("vote_0") != -1){
        voting.updateVotesReceived(payload);
    };
}