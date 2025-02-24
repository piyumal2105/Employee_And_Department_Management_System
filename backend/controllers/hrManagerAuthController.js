import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import HRManager from "../models/hrManagerModel.js";

export const registerHR = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await HRManager.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new HRManager({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "HR Manager registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const loginHR = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await HRManager.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
