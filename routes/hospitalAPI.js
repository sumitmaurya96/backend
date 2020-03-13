const express = require("express");
const router = express.Router();
//Import hospital model
const Hospital = require("../models/hospitalSchema");

//Routes
//Get all data
router.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.json(hospitals);
  } catch (err) {
    res.json({ error: err });
  }
});

//Get specific data
router.get("/:id", async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    res.json(hospital);
  } catch (err) {
    res.json({ error: err });
  }
});

//Submits data
router.post("/", async (req, res) => {
  const hospital = new Hospital({
    state: req.body.state,
    city: req.body.city,
    name: req.body.name,
    hospital_type: req.body.hospital_type,
    medicare: req.body.medicare,
    address: req.body.address,
    pin_code: req.body.pin_code,
    email: req.body.email,
    websites: req.body.websites,
    fecilities: req.body.fecilities,
    services: req.body.services
  });

  try {
    const savedHospital = await hospital.save();
    res.json(savedHospital);
  } catch (err) {
    res.json({ error: err });
  }
});

//Delete hospital data by id
router.delete("/:id", async (req, res) => {
  try {
    const removedHospital = await Hospital.deleteOne({
      _id: req.params.id
    });
    res.json(removedHospital);
  } catch (err) {
    res.json({ error: err });
  }
});

//Update hospital data by id  (name update)
router.patch("/:id", async (req, res) => {
  try {
    const updatedHospital = await Hospital.updateOne(
      {
        _id: req.params.id
      },
      { $set: { name: req.body.name } }
    );
    res.json(updatedHospital);
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = router;
