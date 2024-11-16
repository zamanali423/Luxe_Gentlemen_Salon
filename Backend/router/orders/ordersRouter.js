const express = require("express");
const router = express.Router();
const Orders = require("../../database/orders/ordersData");
const Appointments = require("../../database/orders/appointmentsData");

// Fetch the latest order number
router.get("/latest-order-no", async (req, res) => {
  try {
    const latestOrder = await Orders.findOne().sort({ orderNo: -1 });
    return res.json({ orderNo: latestOrder ? latestOrder.orderNo : 1700 });
  } catch (err) {
    console.error("Failed to fetch the latest order number:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch the latest order number" });
  }
});

// Fetch the latest appointment number
router.get("/latest-appointment-no", async (req, res) => {
  try {
    const latestAppointment = await Orders.findOne().sort({
      "appointment.info": -1,
    });
    return res.json({
      appointmentInfo: latestAppointment?.appointment?.info || 1,
      latestAppointment,
    });
  } catch (err) {
    console.error("Failed to fetch the latest appointment number:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch the latest appointment number" });
  }
});

// Fetch the number of appointments for the barber on the selected date
router.get("/appointments/barber/:barber", async (req, res) => {
  const { barber } = req.params;
  const { date } = req.query;

  // Parse the incoming date string to a Date object
  const dateObj = new Date(date);
  const startOfDay = new Date(dateObj.setHours(0, 0, 0, 0)); // Start of the day
  const endOfDay = new Date(dateObj.setHours(23, 59, 59, 999)); // End of the day

  try {
    const appointmentCount = await Appointments.countDocuments({
      "appointment.barber": barber,
      date: { $gte: startOfDay, $lte: endOfDay }, // Check if date is within the day
    });
    return res.json({ appointmentCount });
  } catch (err) {
    console.error("Failed to fetch the number of appointments:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch the number of appointments" });
  }
});

// Create orders
router.post("/new-order", async (req, res) => {
  const {
    orderNo,
    date,
    status,
    orderNotes,
    name,
    email,
    phone,
    state,
    address,
    zip,
    title,
    price,
    info,
    service,
    startTime,
    endTime,
    paymentMethod,
    barber,
  } = req.body;

  let newOrder;

  try {
    // Validate that the phone number exists
    if (!phone || phone === "undefined") {
      throw new Error("Phone number is missing or undefined.");
    }

    // Create a new order
    newOrder = new Orders({
      orderNo,
      date,
      status,
      orderNotes,
      paymentMethod,
      customerDetail: {
        name,
        email,
        phone,
        country: "Pakistan",
        state,
        address,
        zip,
      },
      itemDetail: {
        title,
        price,
      },
      appointment: {
        info,
        service,
        startTime,
        endTime,
        barber,
      },
    });

    // Save the new order to the database
    await newOrder.save();

    await client.sendMessage("+923054800647", "hello");

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error placing order:", error);

    // Rollback: In case of any other error, ensure no partial updates
    if (newOrder) {
      await Orders.deleteOne({ orderNo: newOrder.orderNo });
    }

    return res.status(500).json({ msg: "Internal server error", error });
  }
});

// Fetch the latest appointment number
router.get("/latest-appointmentNo", async (req, res) => {
  try {
    const latestAppointment = await Appointments.findOne().sort({
      appointmentNo: -1,
    });
    // Return 0 if no appointments are found, otherwise return the latest appointmentNo
    const appointmentNo = latestAppointment
      ? latestAppointment.appointmentNo
      : 0;
    return res.json({ appointmentNo });
  } catch (err) {
    console.error("Failed to fetch the latest appointmentNo:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch the latest appointmentNo" });
  }
});

// Book appointment
router.post("/appointments", async (req, res) => {
  const {
    appointmentNo,
    date,
    status,
    name,
    number,
    barber,
    service,
    price,
    startTime,
    endTime,
    barberNo,
  } = req.body;

  try {
    const appointment = new Appointments({
      appointmentNo,
      date,
      status,
      appointment: {
        name,
        number,
        barber,
        barberNo,
        service,
        price,
        startTime,
        endTime,
      },
    });

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not booked" });
    }

    await appointment.save();

    return res.status(201).json(appointment);
  } catch (error) {
    console.error("Error placing order:", error);

    return res.status(500).json({ msg: "Internal server error", error });
  }
});

module.exports = router;
