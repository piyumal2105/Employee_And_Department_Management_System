import Department from "../models/departmentModel.js";
import Employee from "../models/employeeModel.js";

// Create a new department
export const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department)
      return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update department details
export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!department)
      return res.status(404).json({ message: "Department not found" });
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a department
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department)
      return res.status(404).json({ message: "Department not found" });

    // Check if employees belong to this department
    const employees = await Employee.find({ department: department._id });
    if (employees.length > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete department with assigned employees." });
    }

    await department.deleteOne();
    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign an employee to a department
export const assignEmployeeToDepartment = async (req, res) => {
  try {
    const { employeeId, departmentId } = req.body;

    const department = await Department.findById(departmentId);
    if (!department)
      return res.status(404).json({ message: "Department not found" });

    const employee = await Employee.findById(employeeId);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    employee.department = departmentId;
    await employee.save();

    res.json({ message: "Employee assigned to department", employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
