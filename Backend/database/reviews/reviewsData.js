const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
  comment: { type: String },
  number: { type: String },
  userName: { type: String },
  rating: { type: Number },
});

module.exports = mongoose.model("feedbacks", reviewSchema);
