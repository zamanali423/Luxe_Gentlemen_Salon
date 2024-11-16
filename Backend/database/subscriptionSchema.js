const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const subscriptionSchema = new mongoose.Schema({
  endpoint: { type: String, required: true },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  },
});
module.exports = mongoose.model("subscriptions", subscriptionSchema);
