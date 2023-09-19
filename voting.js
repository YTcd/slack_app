class voting {
    static voteStart(e) {
        const channelId = e.parameter.channel_id;

        if(sheetHandler.getVoteBlockBySheet()){
            messageHandler.postMessageWithoutBlock(channelId,"이미 진행중인 투표가 있습니다.");
            return
        }
        if (e.parameter.text) {
            let text = e.parameter.text;
            let wordArr = text.split(" ");

            wordArr = utils.removeWhiteSpace(wordArr);
            const block = voteBlockGenerator.makeVoteBlock(wordArr);

            sheetHandler.updateRecentVoteBlock(block);
            messageHandler.postMessage(channelId,"",block);
        } else {
            messageHandler.postMessageWithoutBlock(channelId,"명령어 외의, 투표 주제, 항목들을 입력해주세요.");
        }
    }

    static updateVotesReceived(payload){
        const userID = payload.user.id;
        const channelID = payload.channel.id;
        const block = payload.message.blocks;
        const messageTs = payload.container.message_ts;
        const value = payload.actions[0].value;

        const url = "https://slack.com/api/users.profile.get?user=" + userID + "&pretty=1";
        const userProfile = JSON.parse(UrlFetchApp.fetch(url, utils.getOption()));

        const userName = userProfile.profile.real_name;
        const itemIndex = value.slice(6)*1 -1;
        let currentIndex;

        // 이미 있는 닉네임은 삭제 처리
        for(let i = 0; i*2+2 < block.length; i++ ){
            const subjectIndex = i*2+2;
            if(block && block[subjectIndex] && block[subjectIndex].text && block[subjectIndex].text.text &&
                block[subjectIndex].text.text.indexOf(" "+userName) > -1){
                currentIndex = subjectIndex;
                block[subjectIndex].text.text = block[subjectIndex].text.text.replace(" "+userName,"");
                const chosenCnt = block[subjectIndex+1].elements[0].text.split("표")[0];
                block[subjectIndex+1].elements[0].text = (chosenCnt*1-1) + "표";
            }
        }

        // 중복 클릭이 아닐때에만 요소에 이름 추가
        if(currentIndex != itemIndex*2+2){
            block[itemIndex*2+2].text.text += (" "+ userName);
            const chosenCnt = block[itemIndex*2+3].elements[0].text.split("표")[0];
            block[itemIndex*2+3].elements[0].text = (chosenCnt*1+1) + "표";
        }

        sheetHandler.updateRecentVoteBlock(block);
        messageHandler.updateMessage(channelID, messageTs, block);
    }
}