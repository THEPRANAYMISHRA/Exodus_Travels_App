const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    booking: String,
    mobileNumber: Number,
    cardNumber: Number,
    cardholderName: String,
    amount: Number,
    dates: String,
    item_id: String
});

const OrderModel = mongoose.model("booking", orderSchema)

module.exports = OrderModel