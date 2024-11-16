const jwt = require("jsonwebtoken");
const User = require("../database/adminData/adminData");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if the token is present in the request headers
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided. Unauthorized." });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token

    const user = await User.findById(decoded.id); // Find the user by decoded token's id
    if (!user) {
      return res
        .status(404)
        .json({ msg: "Unauthorized User. User not found." });
    }

    req.user = user; // Attach user to the request object
    next(); // Proceed to the next middleware
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // Handle expired token case
      const token = req.headers.authorization.replace("Bearer ", "");
      const decoded = jwt.decode(token); // Decode without verifying the signature

      if (decoded) {
        const user = await User.findById(decoded.id);
        if (user) {
          user.tokens = user.tokens.filter((t) => t.token !== token); // Remove the expired token
          await user.save();
        }
      }

      return res
        .status(401)
        .json({ msg: "Token Expired. Please log in again." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      // Handle invalid token case
      return res.status(401).json({ msg: "Invalid Token" });
    }

    // Catch-all for other errors
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

module.exports = verifyToken;
