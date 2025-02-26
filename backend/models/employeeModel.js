import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  profilePicture: {
    type: String,
  },
});
