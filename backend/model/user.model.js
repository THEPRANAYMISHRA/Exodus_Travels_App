const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    bookings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'allBooking'
      }]
})

const UserModal=mongoose.model("user",userSchema)

module.exports=UserModal