import express from "express";
import {
  registerEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/registerEmployee", registerEmployee);
router.get("/getEmployees", getEmployees);
router.get("/getEmployee/:id", getEmployeeById);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);

export default router;
