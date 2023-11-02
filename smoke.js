class smoke{
    static updateBlock(payload, value){
      let userIndex = -1;
      const channelID = payload.channel.id;
      const messageTs = payload.container.message_ts;
      const userID = payload.user.id;
      for(let i = 0; i<SMOKE_ID_LIST.length; i++){
        if(userID == SMOKE_ID_LIST[i]){
          userIndex = i;
        }
      }
  
      if(userIndex == -1){
        return;
      }
  
      const blockValue = dampiBlockRange.getValue();
      const block = JSON.parse(blockValue);
      const current = block[2].text.text;
      
      let switchedText = "white_circle";
      switch(value){
        case "leGo":
          switchedText = "large_green_circle";
          break;
        case "cantGo":
          switchedText = "red_circle";
          break;
        case "waitASec":
          switchedText = "large_yellow_circle";
          break;
      }
      
      const spilited = current.split(":");
      const tempArr = [];
      spilited.forEach((str)=>{
        if(str != "   " & str!= ""){
           tempArr.push(str);
        }
      });
  
      tempArr[userIndex] = switchedText;
      block[2].text.text = ":"+tempArr[0]+":   :"+tempArr[1]+":   :"+tempArr[2]+":   :"+tempArr[3]+":";
      dampiBlockRange.setValue(JSON.stringify(block));
      
      messageHandler.updateMessage(channelID, messageTs, block);
    }
  }
  