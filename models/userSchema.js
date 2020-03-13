const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  blood_group: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  tatto: {
    type: Date,
    required: false
  },
  infection: {
    type: Array,
    required: true
  },
  previous_donation_date: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("users", userSchema);
