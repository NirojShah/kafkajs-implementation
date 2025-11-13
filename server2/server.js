import http from "http";
import express from "express";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "e-comm",
  brokers: ["localhost:9092"],
  connectionTimeout: 600,
});

const consumer = kafka.consumer({ groupId: "inventory" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "order-placed" });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("UPDATE THE INVENTORY - ");
      console.log(JSON.parse(message.value.toString()));
    },
  });
};

run().catch(console.error);

process.on("SIGINT", async () => {
  console.log("Disconnecting consumer...");
  await consumer.disconnect();
  process.exit(0);
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
