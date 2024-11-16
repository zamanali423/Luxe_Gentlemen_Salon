const jwt = require("jsonwebtoken");

// Function to generate and store JWT token
const generateToken = async (user) => {
  try {
    // Generate a token with user ID as payload and expiry of 29 days
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "29d",
    });

    // Initialize tokens array if it doesn't exist
    user.tokens = user.tokens || [];

    // Push the new token to the tokens array
    user.tokens.push({ token });

    // Save the user document with the new token
    await user.save();

    // Return the generated token
    return token;
  } catch (error) {
    // Handle error (you might want to log the error in a real app)
    console.error("Error generating token:", error);

    // Return a descriptive error message
    throw new Error("Failed to generate token");
  }
};

module.exports = generateToken;
