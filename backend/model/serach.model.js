const mongoose=require("mongoose")

const searchSchema=mongoose.Schema({
    Booking_type:String,
    from:String,
    to:String,
    checkIn:String,
    checkOut:String,
    seats:Number
})

const SearchModal=mongoose.model("allData",searchSchema)

module.exports=SearchModal