require("dotenv").config();

const { WebClient } = require('@slack/web-api');
const {createServer} = require('http');
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const appToken = process.env.APP_TOKEN;
const token = process.env.SLACK_TOKEN;

const client = new WebClient(token);

const postMessage = async ()=>{
    try{
        await client.chat.postMessage({
            channel: "bot-test",
            text: "test",
            attachments: [
                {
                    fallback: "test",
                    color:"#ffffff",
                    title:"재택 신청",
                    actions:[
                        {
                            name:"game",
                            text:"재택 신청",
                            type:"button",
                            value:"callback",
                            link:"www.naver.com",
                        }
                    ]
                }
            ]
        }).then((res)=>{
            console.log(res);
        })
    }catch (e){
        console.log(e);
    }
}

postMessage();
// slackEvents.on("message",async (event)=>{
//     const result = await web.chat.postMessage({
//         text: 'text',
//         channel: channel,
//     })
//
//     console.log("message send success")
// })
//
// slackEvents.on("error",console.error("asd"));
//
// app.use("/slack/events", slackEvents.requestListener());
// app.use(express.json());
// const server = createServer(app);
// server.listen(port,(req,res)=>{
//     console.log("listen event " + server.address().port);
// })