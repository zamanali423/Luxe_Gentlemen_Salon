require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8080;
const app = express();

// Routers
const servicesRouter = require("./router/servicesRouter/servicesRouter");
const ordersRouter = require("./router/orders/ordersRouter");
const adminRouter = require("./router/admin/adminRouter");
const user = require("./router/admin/users/users");
const { default: axios } = require("axios");
const reviewsRouter = require("./router/reviews/reviewsRouter");

// Middlewares
app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.json());
app.use("/services", servicesRouter);
app.use("/orders", ordersRouter);
app.use("/admin", adminRouter);
app.use("/admin", user);
app.use("/reviews", reviewsRouter);

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.post("/form", async (req, res) => {
  const { number, msg, image } = req.body;
  try {
    const uniqueNumbers = [...new Set(number)];
    console.log(uniqueNumbers);
    const promises = uniqueNumbers.map(async (number) => {
      let numberAsString = String(number); // Convert number to string
      const updateNumber = `92${numberAsString
        .slice(1)
        .replace(/^(\d{3})/, "$1 ")}`;
      let url = `http://api.textmebot.com/send.php?recipient=${updateNumber}&apikey=${process.env.API_KEY}&text=${msg}`;

      if (image) {
        url += `&file=${image}`;
      }

      try {
        const message = await axios.get(url);
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
    return res.status(500).json({
      message: "Failed to send messages due to server or network problem",
      error,
    });
  }
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
