import { PrismaClient } from "@prisma/client";
import express from "express";

const PORT = Number(process.env.PORT || 8888);
const app = express();
const clnt = new PrismaClient();

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to LearnHub").end();
});

app.listen(PORT, () => {
  console.log(`LearnHub API is up at ${PORT}`);
});