const express=require("express")
const searchRouter=express.Router()
const SearchModal=require("../model/serach.model")

searchRouter.post("/available",async(req,res)=>{
    let {Booking_type,from,to,checkIn,checkOut,seats}=req.body
    try {
        let data= await SearchModal.find({
            Booking_type:Booking_type,
            checkIn:{$gte:checkIn}, 
            checkOut:{$lte:checkOut},
            seats:{$gt:0}
        })
        res.send(data)
    } catch (error) {
        res.status(400).send({"msg":"no service available!"})
    }
})

module.exports=searchRouter
