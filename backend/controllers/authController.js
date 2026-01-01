import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try{
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }       
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
user = new User({
  name,
  email,
  password: hashedPassword,
});
await user.save();
const payload = {
  user: {
    id: user._id,
  },
};
const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: "10d",
});
res.status(201).json({
  token,
});
} catch (error) {
  console.error("Register error:", error.message);
  res.status(500).json({ message: error.message });
}
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const payload = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10d",  
    });
    res.status(200).json({
      token,
    });
    } catch (error) {  
        res.status(500).json({ message: "Server error" }); 
    }
};
export const logout = (req, res) => {
  // Invalidate the token on the client side
  res.status(200).json({ message: "Logged out successfully. Please remove the token on the client side " });
};
export const viewusers = async (req, res) => {
  try {
    const users = await User.find({}); 
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, city, state, zipCode } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (city) user.city = city;
    if (state) user.state = state;
    if (zipCode) user.zipCode = zipCode;

    await user.save();

    // Return updated user without password
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

