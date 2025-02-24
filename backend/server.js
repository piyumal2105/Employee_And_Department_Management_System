import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnect from "./config/dbConfig.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
  dbConnect();
});
