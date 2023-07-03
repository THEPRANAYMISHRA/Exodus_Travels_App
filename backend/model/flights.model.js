const mongoose = require("mongoose")

const flightsSchema = new mongoose.Schema({
  company: String,
  from: String,
  to: String,
  prices: {
    Economy: Number,
    Business: Number,
    FirstClass: Number
  }
});

const FlightModel = mongoose.model("Flight", flightsSchema)

module.exports = FlightModel