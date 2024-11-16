const express = require("express");
const router = express.Router();
const Appointments = require("../../database/orders/appointmentsData");
const authentication = require("../../middleware/verifyToken");
const Reviews = require("../../database/reviews/reviewsData");
const { default: axios } = require("axios");

//! Get all orders
router.get("/orders", authentication, async (req, res) => {
  try {
    const orders = await Appointments.find().sort({ appointmentNo: -1 });
    if (!orders) {
      return res.status(404).json({ msg: "Appointments not found" });
    }
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! update orders
router.put("/orders/update/:id", authentication, async (req, res) => {
  const { id } = req.params;
  const {
    date,
    status,
    price,
    service,
    startTime,
    endTime,
    barber,
    barberNo,
    name,
    number,
  } = req.body;

  try {
    const order = await Appointments.findByIdAndUpdate(
      id,
      {
        date,
        status,
        appointment: {
          name,
          number,
          barber,
          barberNo,
          price,
          service,
          startTime,
          endTime,
        },
      },
      { new: true }
    );

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error placing Appointments:", error);

    // Rollback: In case of any other error, ensure no partial updates
    if (newOrder) {
      await Orders.deleteOne({ orderNo: newOrder.orderNo });
    }

    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! delete orders
router.delete("/orders/delete/:id", authentication, async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Appointments.findByIdAndDelete(id);

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error placing order:", error);

    // Rollback: In case of any other error, ensure no partial updates
    if (order) {
      await Appointments.deleteOne({ appointmentNo: order.appointmentNo });
    }

    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! search orders by partial matching barber, service, start time, end time
router.get("/orders/search", authentication, async (req, res) => {
  const { service, barber, startTime, endTime } = req.query;

  try {
    const searchCriteria = [];

    if (service) {
      searchCriteria.push({
        "appointment.service": { $regex: service, $options: "i" },
      });
    }
    if (barber) {
      searchCriteria.push({
        "appointment.barber": { $regex: barber, $options: "i" },
      });
    }
    if (startTime) {
      searchCriteria.push({
        "appointment.startTime": { $regex: startTime, $options: "i" },
      });
    }
    if (endTime) {
      searchCriteria.push({
        "appointment.endTime": { $regex: endTime, $options: "i" },
      });
    }

    // If no criteria is provided, return all orders
    const order = await Orders.find(
      searchCriteria.length > 0 ? { $or: searchCriteria } : {}
    );

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error searching orders:", error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

//! send whatsapp message
router.post("/send-message", async (req, res) => {
  const { msg, image } = req.body;
  try {
    // Fetch all numbers from your database
    const appointments = await Appointments.find({}, "appointment.number");
    const getAllUsersNumbers = appointments.map(
      (appointment) => appointment.appointment.number
    );
    const uniqueNumbers = [...new Set(getAllUsersNumbers)];
    const promises = uniqueNumbers.map(async (number) => {
      let numberAsString = String(number); // Convert number to string
      const updateNumber = `92${numberAsString.replace(
        /^(\d{3})(\d+)/,
        "$1 $2"
      )}`;
      let url = `http://api.textmebot.com/send.php?recipient=${updateNumber}&apikey=${process.env.API_KEY}&text=${msg}`;

      if (image) {
        url += `&file=${image}`;
      }

      try {
        const message = await axios.get(url);
        console.log(message.data);
        return message.data;
      } catch (error) {
        console.error(
          `Failed to send to ${updateNumber}:`,
          error.response ? error.response.data : error.message
        );
        return null; // Handle the error for this particular number
      }
    });

    // Wait for all promises to resolve
    const results = await Promise.all(promises);
    const successfulSends = results.filter((result) => result !== null);
    console.log(successfulSends);
    return res
      .status(200)
      .json({ message: "Messages sent", results: successfulSends });
  } catch (error) {
    console.error("Error sending messages:", error);
    return res.status(500).json({ message: "Failed to send messages", error });
  }
});

//! fetch numbers by date
router.get("/numbers-by-date/:fromDate/:toDate", async (req, res) => {
  const { fromDate, toDate } = req.params;
  try {
    const from = new Date(fromDate).toISOString();
    const to = new Date(toDate).toISOString();
    const appointments = await Appointments.find({
      date: { $gte: from, $lte: to },
    });
    if (!appointments) {
      return res.status(404).json({ message: "numbers not found" });
    }

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching numbers:", error);
    return res.status(500).json({ message: "Failed to fetch numbers", error });
  }
});

//! delete reviews
router.delete("/delete-review/:id", authentication, async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Reviews.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ msg: "review not found" });
    }
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error", error });
  }
});

module.exports = router;
