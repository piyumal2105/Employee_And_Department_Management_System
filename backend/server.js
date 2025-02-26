import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnect from "./config/dbConfig.js";
import hrManagerAuthRoutes from "./routes/hrManagerAuthRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth/hr", hrManagerAuthRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
  dbConnect();
});
