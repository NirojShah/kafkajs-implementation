import http from "http";
import express from "express";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "e-comm",
  brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({ groupId: "inventory" });

await consumer.connect();
await consumer.subscribe({ topic: "order-placed" });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      topic,
      partition,
      value: message.value.toString(),
    });
  },
});


const app = express();
const server = http.createServer(app);
const port = 5002;

server.listen(port, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(`SERVER RUNNING AT - ${port}`);
});
