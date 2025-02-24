import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnect from "./config/dbConfig.js";
import hrManagerAuthRoutes from "./routes/hrManagerAuthRoutes.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth/hr", hrManagerAuthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
  dbConnect();
});
