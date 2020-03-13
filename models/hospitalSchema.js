const mongoose = require("mongoose");

const HospitalSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pin_code: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  websites: {
    type: String,
    required: false
  },
  phone_number: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("hospitals", HospitalSchema);
