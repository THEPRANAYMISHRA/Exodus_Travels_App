const mongoose=require("mongoose")

const bookingSchema = new mongoose.Schema({
  Booking_type:String,
  from:String,
  to:String,
  checkIn:String,
  checkOut:String,
  travellers:{type:Number,default:1},
  userId:String,
  valid:{type: Boolean, default:true}
  });

const BoookingModel=mongoose.model("allBooking",bookingSchema)

module.exports=BoookingModel