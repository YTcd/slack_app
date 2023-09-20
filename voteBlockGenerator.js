class voteBlockGenerator{
    static makeVoteBlock(wordArr) {
        let block = [];
        for (let i = 0; i < wordArr.length; i++) {
            if (i == 0) {
                block.push({
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: wordArr[0],
                    },
                });
                block.push({type:"divider"});
            } else {
                block.push(this.generateBlock1(i,wordArr[i]));
                block.push(this.generateBlock2())
            }
        }

        block.push({type:"divider"});
        block.push({
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "plain_text_input-action"
                },
                "label": {
                    "type": "plain_text",
                    "text": "항목 추가",
                    "emoji": true
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "항목 추가"
                        },
                        "style": "primary",
                        "value": "addItem"
                    }
                ]
            },
            {
                "type": "divider"
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "투표 삭제"
                        },
                        "style": "danger",
                        "value": "delete"
                    }
                ]
            })

        return JSON.stringify(block);
    }

    static getBlockWithDeleteButton(text){
        return [
            {
                type: "section",
                text: { type: "mrkdwn", text: text },
                accessory: {
                    type: "button",
                    text: { type: "plain_text", text: "메시지 삭제" },
                    style: "danger",
                    value: "delete",
                },
            }
        ]
    }

    static generateBlock1(index,text){
        return {
            type: "section",
            text: {
                type: "mrkdwn",
                text: index+". "+text,
            },
            accessory: {
                type: "button",
                text: {
                    type: "plain_text",
                    text: ":white_check_mark:투표",
                },
                style: "primary",
                value: "vote_0"+index,
            },
        }
    }

    static generateBlock2(cnt = 0){
        return {
            type: "context",
            elements: [
                {
                    type: "plain_text",
                    text: cnt+"표",
                },
            ],
        }
    }

}
