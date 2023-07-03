const express = require("express")
const bookingRouter = express.Router()
const UserModal = require("../model/user.model")
const auth = require("../middleware/notes.middleware")
// const BoookingModel = require("../model/booking.model")
const cors = require("cors")

bookingRouter.get("/history", auth, async (req, res) => {
    let { userId } = req.body
    try {
        let historydata = await BoookingModel.find({ userId })
        if (historydata.length > 0) {
            res.send(historydata)
        } else {
            res.status(400).send({ "msg": "login first!" })
        }
    } catch (error) {
        res.status(400).send({ "msg": "login first!" })
    }
})

// bookingRouter.post("/booking", auth, async (req, res) => {
//     const allBooking=new BoookingModel(req.body)
//     try {
//         await allBooking.save()
//         res.status(200).send({"msg":"boooking successful!"})
//     } 
//     catch (error) {
//         res.status(400).send({"msg":"Something went wrong"})
//     }
// })


module.exports = bookingRouter