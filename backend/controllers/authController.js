

// // controllers/authController.js
// const User = require("../models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const { OAuth2Client } = require("google-auth-library");

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const generateToken = (user) =>
//   jwt.sign(
//     { id: user._id, role: user.role, name: user.name, email: user.email },
//     process.env.JWT_SECRET,
//     { expiresIn: "1m" }
//   );

// const register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Email already registered." });

//     const hashed = await bcrypt.hash(password, 10);
//     await User.create({ name, email, password: hashed, role });
//     res.status(201).json({ message: "Registered successfully." });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials." });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: "Invalid credentials." });

//     const token = generateToken(user);
//     res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({ role: "user" }).select("-password");
//     res.json({ users });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };



// const googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;

//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const { email, name, picture } = ticket.getPayload();

//     let user = await User.findOne({ email });
//     if (!user) {
//       user = await User.create({ name, email, password: "", role: "user", avatar: picture });
//     }

//     const jwtToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.json({ token: jwtToken, user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Google login failed." });
//   }
// };

// module.exports = { register, login, getAllUsers, generateToken, googleLogin};

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT token (expires in 1 minute)
const generateToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1m" } // changed from 7d -> 1m
  );

// Register user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already registered." });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed, role });
    res.status(201).json({ message: "Registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials." });

    const token = generateToken(user);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all users (for admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Google login
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: "",
        role: "user",
        avatar: picture,
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1m" } // changed to 1 minute
    );

    res.json({ token: jwtToken, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google login failed." });
  }
};

module.exports = { register, login, getAllUsers, generateToken, googleLogin };
