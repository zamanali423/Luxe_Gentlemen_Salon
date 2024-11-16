const express = require("express");
const router = express.Router();
const Services = require("../../database/services/servicesData");

//! get all services
router.get("/", async (req, res) => {
  try {
    const services = await Services.find();
    res.status(200).json(services);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
});

//! Get single service
router.get("/single-service/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Assuming the ID corresponds to a service ID, you may need to know the category as well
    const category = await Services.findOne({ "services.id": id });

    if (!category) {
      return res.status(404).json({ msg: "Service not found" });
    }

    // Find the specific service in the category
    const service = category.services.find(
      (service) => service.id === parseInt(id)
    );

    if (!service) {
      return res.status(404).json({ msg: "Service not found in category" });
    }

    res.status(200).json(service);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
});

//! save image
router.post("/images", async (req, res) => {
  const { id } = req.query; // id should come from query parameters
  const { image } = req.body; // image should come from request body

  try {
    // Find the category containing the service by service ID
    const category = await Services.findOne({ "services.id": id });
    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    // Find the specific service in the category
    const service = category.services.find(
      (service) => service.id === parseInt(id)
    );

    if (!service) {
      return res.status(404).json({ msg: "Service not found in category" });
    }

    // Update the image field with the new image
    service.image = image;

    // Save the updated category with the new image in the specific service
    await category.save();

    res.status(200).json({ msg: "Image updated successfully", service });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
});

module.exports = router;
