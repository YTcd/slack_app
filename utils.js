class utils {
    static extractBlock(obj){
        for(const key in obj){
            if(key == "blocks" || key == "block"){
                return obj[key];
            }
  
            if(obj[key] != undefined){
                this.extractBlock(obj[key]);
            }
        }
  
        return undefined;
    }
  
    static extractIDFromBlock(blocksArr){
        let blockId = "";
        if(Array.isArray(blocksArr)){
            blocksArr.forEach((item)=>{
                if(item.type == "input"){
                    blockId = item.block_id;
                }
            })
        }
        return blockId;
    }
  
    static getLastBlockIndex(blocksArr){
        let lastIndex = 1;
        if(Array.isArray(blocksArr)){
            blocksArr.forEach((item,index)=>{
                if(item.text &&
                    item.text.type == "mrkdwn"){
                    lastIndex = index+1;
                }
            })
        }
        return lastIndex;
    }
  
    static removeWhiteSpace(wordArr) {
        if (wordArr[0] === "") {
            wordArr.shift();
        }
        return wordArr;
    }
  
    static getOption(){
        return {
            "method" : "get",
            "headers" : {
                "Authorization" : "Bearer " + OAUTHTOKEN,
            }
        }
    }
  }