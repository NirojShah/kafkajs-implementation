import http from "http";
import express from "express";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "e-comm",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const app = express();

app.post("/", async (req, res) => {
  await producer.connect();
  await producer.send({
    key:"order",
    topic: "order-placed",
    messages: [
      {
        value: JSON.stringify({
          order_id: "xyz",
          item_qnt: 10,
          item_id: 1,
        }),
      },
    ],
  });
  return res.status(200).json({
    status: "success",
  });
});

const server = http.createServer(app);

const port = 5001;
server.listen(port, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(`SERVER RUNNING AT - ${port}`);
});
