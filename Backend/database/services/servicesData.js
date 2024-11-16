const { default: mongoose } = require("mongoose");

// Define the schema for individual services
const serviceSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true, // Ensure the ID is unique
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
});

// Define the schema for service categories
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
  },
  services: [serviceSchema], // Array of services
});

// Create the model
module.exports = mongoose.model("services", categorySchema);
