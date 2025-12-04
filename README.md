# KafkaJS Implementation

A learning project demonstrating Apache Kafka integration with Node.js using KafkaJS client library. This project showcases the fundamental concepts of message streaming including producers, consumers, and admin operations.

## ‹ Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14 or higher)
- Docker and Docker Compose
- npm or yarn package manager

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NirojShah/kafkajs-implementation.git
cd kafkajs-implementation
```

2. Install dependencies:
```bash
npm install
```

3. Start Kafka and Zookeeper using Docker Compose:
```bash
docker-compose up -d
```

## 1. Project Structure

```
kafkajs-implementation/
â”œâ”€â”€ admin/          # Kafka admin operations (topic creation, management)
â”œâ”€â”€ consumer/       # Kafka consumer implementation
â”œâ”€â”€ producer/       # Kafka producer implementation
â”œâ”€â”€ docker-compose.yaml
â”œâ”€â”€ package.json
â””â”€â”€ README.md
```

## 2. Usage

### Running the Producer

```bash
node producer/index.js
```

### Running the Consumer

```bash
node consumer/index.js
```

### Admin Operations

```bash
node admin/index.js
```

## 3. Technologies Used

- **Node.js** - Runtime environment
- **KafkaJS** - Modern Apache Kafka client for Node.js
- **Docker** - Containerization for Kafka and Zookeeper
- **Apache Kafka** - Distributed streaming platform

## 4. Learning Objectives

This project covers:
- Setting up Kafka with Docker
- Creating and managing Kafka topics
- Implementing message producers
- Implementing message consumers
- Understanding message streaming patterns

## 5. Troubleshooting

If you encounter connection issues:
- Ensure Docker containers are running: `docker-compose ps`
- Check Kafka logs: `docker-compose logs kafka`
- Verify Kafka is accessible on `localhost:9092`

## 6. License

This project is open source and available for learning purposes.

## 7. Author

**Niroj Shah**
- GitHub: [@NirojShah](https://github.com/NirojShah)

---

 Star this repository if you find it helpful for learning Kafka!


