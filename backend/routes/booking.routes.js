const express = require("express");
const bookingRouter = express.Router();
const UserModal = require("../model/user.model");
const OrderModel = require("../model/order.model");
const StaysModel = require('../model/stays.model');
const FlightsModel = require('../model/flights.model');
const CarsModel = require('../model/cars.model');

// GET bookings route with email as query parameter
bookingRouter.get("/bookings", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({ "msg": "Email is required in the query parameters." });
    }
    try {
        const regexEmail = new RegExp(email, "i");

        let historydata = await OrderModel.find({ email: regexEmail });

        if (historydata.length > 0) {
            return res.send(historydata);
        } else {
            return res.status(404).send({ "msg": "No bookings found for the provided email." });
        }
    } catch (error) {
        return res.status(500).send({ "msg": "Something went wrong while fetching bookings." });
    }
});


// POST booknow route
bookingRouter.post("/booknow", async (req, res) => {
    const { name, email, booking, mobileNumber, cardNumber, cardholderName, amount, dates, item_id } = req.body;

    // Add validation for required fields
    if (!name || !email || !booking || !mobileNumber || !cardNumber || !cardholderName || !amount || !item_id) {
        return res.status(400).send({ "msg": "All fields are required for booking." });
    }

    // Add regex validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileNumberRegex = /^\d{10}$/;
    const cardNumberRegex = /^\d{16}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).send({ "msg": "Please provide a valid email address." });
    }

    if (!mobileNumberRegex.test(mobileNumber)) {
        return res.status(400).send({ "msg": "Please provide a valid 10-digit mobile number." });
    }

    if (!cardNumberRegex.test(cardNumber)) {
        return res.status(400).send({ "msg": "Please provide a valid 16-digit card number." });
    }

    try {
        const newBooking = new OrderModel({ name, email, booking, mobileNumber, cardNumber, cardholderName, amount, dates, item_id });
        await newBooking.save();
        return res.status(200).send({ "msg": "Booking successful!." });
    } catch (error) {
        return res.status(500).send({ "msg": "Something went wrong while processing the booking." });
    }
});


module.exports = bookingRouter;
