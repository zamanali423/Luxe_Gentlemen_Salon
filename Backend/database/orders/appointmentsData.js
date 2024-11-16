const { default: mongoose } = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  appointmentNo: {
    type: Number,
    unique: true,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
  },
  appointment: {
    name: {
      type: String,
    },
    number: {
      type: Number,
    },
    barber: {
      type: String,
    },
    barberNo: {
      type: String,
    },
    service: {
      type: String,
    },
    price: {
      type: Number,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
  },
});

module.exports = mongoose.model("appointments", appointmentSchema);
