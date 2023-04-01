const express=require("express")
const bookingRouter=express.Router()
const UserModal=require("../model/user.model")
const auth=require("../middleware/notes.middleware")
const BoookingModel=require("../model/booking.model")

bookingRouter.get("/history",auth,async(req,res)=>{
    let {userId}=req.body
    let historydata= await BoookingModel.find({userId})
    res.send(historydata)
})

bookingRouter.post("/booking",auth,async(req,res)=>{
    try {
        const allBooking=new BoookingModel(req.body)
        await allBooking.save()
        res.status(200).send({"msg":"boooking successful!"})
    } catch (error) {
        res.status(400).send({"msg":"boooking failed!"})
    }
})


module.exports=bookingRouter