import express from "express";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  assignEmployeeToDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

router.post("/createDepartment", createDepartment);
router.get("/getallDepartments", getDepartments);
router.get("/getDepartment/:id", getDepartmentById);
router.put("/updateDepartment/:id", updateDepartment);
router.delete("/deleteDepartment/:id", deleteDepartment);
router.post("/assignEmployee", assignEmployeeToDepartment);

export default router;
