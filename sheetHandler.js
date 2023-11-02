class sheetHandler{
    static clearRecentVoteBlock(save) {
        if(save){
          const currentLogCount = logCountRange.getValue();
          
        }
        recentVoteBlockRange.setValue(null);
    }
  
    static getVoteBlockBySheet(){
        let value = recentVoteBlockRange.getValue();
        if(value){
            return JSON.parse(value);
        }
        return undefined;
    }
  
    static updateRecentVoteBlock(block){
        recentVoteBlockRange.setValue(block);
    }
  }