const express = require("express");
const router = express.Router();
const User = require("../../../database/adminData/adminData");
const verifyToken = require("../../../middleware/verifyToken");
const generateToken = require("../../../authentication/generateToken");

//! Login User
router.post("/login", async (req, res) => {
  const { password, role } = req.body;
  try {
    const user = await User.findOne({ role });
    if (!user) {
      return res.status(404).json({ msg: "Email or password is incorrect" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await User.findOne({ password });
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Email or password is incorrect" });
    }

    // Generate token after successful authentication
    const token = await generateToken(user);

    if (role === "owner") {
      return res.status(200).json({ msg: "Login Successful", user, token });
    } else {
      return res.status(200).json({ msg: "Login Successful", user, token });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});

//! Get User Details
router.get("/getUser", verifyToken, async (req, res) => {
  try {
    const user = req.user; // Assuming the verifyToken middleware attaches the user to req.user
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Return the user details
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
});

module.exports = router;
