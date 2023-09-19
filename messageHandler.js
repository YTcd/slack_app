class messageHandler{
    static deleteMessage(channelID,ts){
        const url = "https://slack.com/api/chat.delete";

        const payload = {
            "token" : OAUTHTOKEN,
            "channel" : channelID,
            "ts" : ts
        };

        const params = {
            "method" : "post",
            "payload" : payload
        };

        UrlFetchApp.fetch(url, params);
    }

    static updateMessage(channelID,ts,block) {
        const url = "https://slack.com/api/chat.update";
        if(!block){
            block = [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "텍스트",
                    }
                }
            ];
        }
        let payload = {
            channel: channelID,
            ts: ts,
            blocks: block,
        };

        let options = {
            method: "POST",
            contentType:"application/json",
            headers: {
                "Authorization": "Bearer "+ OAUTHTOKEN,
            },
            payload: JSON.stringify(payload),
        };

        UrlFetchApp.fetch(url, options);
    }

    static postMessageWithoutBlock(channelID, text) {
        var url = "https://slack.com/api/chat.postMessage";
        var payload = {
            channel: channelID,
            text: text,
        };
        var header = {
            Authorization: "Bearer " + OAUTHTOKEN,
        };
        var options = {
            method: "POST",
            contentType: "application/json",
            headers: header,
            payload: JSON.stringify(payload),
        };
        return UrlFetchApp.fetch(url, options);
    }

    static postMessage(channelID, text, block) {
        const url = "https://slack.com/api/chat.postMessage";
        const payload = {
            channel: channelID,
            text: text,
            blocks: block,
        };
        const header = {
            Authorization: "Bearer " + OAUTHTOKEN,
        };
        const options = {
            method: "POST",
            contentType: "application/json",
            headers: header,
            payload: JSON.stringify(payload),
        };
        return UrlFetchApp.fetch(url, options);
    }

}
