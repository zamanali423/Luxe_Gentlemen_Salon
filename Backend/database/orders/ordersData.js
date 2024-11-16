const { default: mongoose } = require("mongoose");

const ordersSchema = new mongoose.Schema({
  orderNo: {
    type: Number,
    unique: true,
  },
  date: {
    type: Date,
  },
  status: {
    type: String,
  },
  orderNotes: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },

  customerDetail: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    address: {
      type: String,
    },
    zip: {
      type: Number,
    },
  },
  itemDetail: {
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  appointment: {
    info: {
      type: Number,
    },
    barber: {
      type: String,
    },
    service: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
  },
});

module.exports = mongoose.model("orders", ordersSchema);
