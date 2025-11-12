import http from "http";
import express from "express";
import { Kafka } from "kafkajs";

const app = express();

const server=  http.createServer(app);

const port = 5000
server.listen(port,(err)=>{
    if(err){
        console.log(err.message)
        return
    }
    console.log(`SERVER RUNNING AT - ${port}`)
})
