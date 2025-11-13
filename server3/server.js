import http from "http";
import express from "express";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "e-comm",
  brokers: ["localhost:9092"],
  connectionTimeout: 3000,
});

const consumer = kafka.consumer({ groupId: "mail-system" });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "order-placed" });
  await consumer.subscribe({ topic: "initiate-confirmation-mail" });

  let orders = {};

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const data = JSON.parse(message.value.toString());

      if (topic === "order-placed") {
        orders[data.order_id] = data;
      } else if (topic === "initiate-confirmation-mail") {
        const order = orders[data.order_id];
        if (order) {
          console.log({
            to: data.to,
            mailContent: `${data.content} ${order.item_id} (qty: ${order.item_qnt})`,
          });
        } else {
          console.log("Order info not yet available for", data.order_id);
        }
      }
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
server.listen(5003, () => console.log("SERVER RUNNING AT - 5003"));
