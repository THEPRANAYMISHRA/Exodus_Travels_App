const express = require("express")
const searchRouter = express.Router()
const CarsModel = require("../model/cars.model")
const StaysModel = require("../model/stays.model")
const FlightsModel = require("../model/flights.model")

searchRouter.post("/available/:view", async (req, res) => {
    let lookingfor = req.params.view

    let { checkin, checkout, city, from, to, depaturedate, returndate, pickuplocation, dropofflocation, pickuptime } = req.body

    console.log(lookingfor)
    console.log(req.body)

    if (lookingfor == 'Stays') {
        try {
            let data = await StaysModel.find({
                city: city
            })

            console.log(data)
            return res.send(data)
        } catch (error) {
            res.status(400).send({ "msg": "No hotels available!" })
        }
    } else if (lookingfor == "Flights") {
        try {
            let data = await FlightsModel.find({
                from: from,
                to: to
            })

            console.log(data)
            return res.send(data)
        } catch (error) {
            res.status(400).send({ "msg": "No flights available!" })
        }
    } else {
        try {
            let data = await CarsModel.find({
                city: dropofflocation
            })
            return res.send(data)
        } catch (error) {
            res.status(400).send({ "msg": "No cars available!" })
        }
    }
})

searchRouter.post("/view", async (req, res) => {
    let { _id } = req.body
    try {
        let data = await FlightsModel.findById(_id) || await StaysModel.findById(_id) || await CarsModel.findById(_id)
        return res.status(200).send(data)
    } catch (error) {
        return res.status(400).send({ msg: error })
    }
})

module.exports = searchRouter
