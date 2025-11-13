import http from "http";
import express from "express";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "e-comm",
  brokers: ["localhost:9092"],
  connectionTimeout: 600,
});

const producer = kafka.producer();

const run = async () => {
  await producer.connect();
};

run().catch(console.error);

process.on("SIGINT", async () => {
  console.log("Disconnecting consumer...");
  await producer.disconnect();
  process.exit(0);
});

const app = express();

app.post("/", async (req, res) => {
  await producer.send({
    key: "order",
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

  await producer.send({
    key: "order-mail",
    topic: "initiate-confirmation-mail",
    messages: [
      {
        value: JSON.stringify({
          to: "abc@xyz.com",
          content: "order placed successfully for item",
          order_id: "xyz",
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
