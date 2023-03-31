const mongoose=require("mongoose")

const bookingSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    date: Date
  });

const BoookingModel=mongoose.model("allBooking",bookingSchema)

module.exports=BoookingModel