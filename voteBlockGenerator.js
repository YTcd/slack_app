class voteBlockGenerator {
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
          block.push({ type: "divider" });
        } else {
          block.push(this.generateBlock1(i, wordArr[i]));
          block.push(this.generateBlock2())
        }
      }
  
      block.push({ type: "divider" });
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
  
    static getBlockWithDeleteButton(text) {
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
  
    static generateBlock1(index, text) {
      return {
        type: "section",
        text: {
          type: "mrkdwn",
          text: index + ". " + text,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: ":white_check_mark:투표",
          },
          style: "primary",
          value: "vote_0" + index,
        },
      }
    }
  
    static generateBlock2(cnt = 0) {
      return {
        type: "context",
        elements: [
          {
            type: "plain_text",
            text: cnt + "표",
          },
        ],
      }
    }
  
    static generateBizCheckBlock() {
      return [{
        type: "section",
        text: {
          type: "mrkdwn",
          text: "월간 개인경비 청구 하세요.(식대 등)"
        }
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "웹 링크"
            },
            url: "https://www.bizplay.co.kr/"
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "AOS(마켓)"
            },
            url: "https://play.google.com/store/apps/details?id=com.bizcard.bizplay&hl=ko"
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "IOS(스토어)"
            },
            url: "https://apps.apple.com/kr/app/%EB%B9%84%EC%A6%88%ED%94%8C%EB%A0%88%EC%9D%B4/id1501659393?l=en"
          }
        ]
      }]
    }
  
    static getDamPiBlock() {
      return [
        {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": "고?"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": "선임 영태 태호 종원"
          }
        },
        {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": ":white_circle:   :white_circle:   :white_circle:   :white_circle:"
          }
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
                "text": "고고"
              },
              "value": "leGo"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "못가요.."
              },
              "value": "cantGo"
            },
            {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "조금만 기다려주세요"
              },
              "value": "waitASec"
            }
          ]
        }
      ]
  
    }
  }
  