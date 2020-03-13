const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  blood_groups: {
    type: String,
    required: true
  },
  people_donated: {
    type: Array,
    required: true
  },
  request_type: {
    type: String,
    required: true
  },
  request_status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("request", RequestSchema);
