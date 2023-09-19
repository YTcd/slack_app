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