const mongoose=require("mongoose")

const bookingSchema = new mongoose.Schema({
  Booking_type:String,
  from:String,
  to:String,
  checkIn:String,
  checkOut:String,
  travellers:Number,
  userId:String,
  valid:{type: Boolean, default: false}
  });

const BoookingModel=mongoose.model("allBooking",bookingSchema)

module.exports=BoookingModel