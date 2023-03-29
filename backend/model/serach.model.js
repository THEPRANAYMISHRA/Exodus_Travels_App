const mongoose=require("mongoose")

const searchSchema=mongoose.Schema({
    lookingfor:String,
    from:String,
    to:String,
    checkIn:Date,
    checkOut:Date,
    Travellers:Number
})

const SearchModal=mongoose.model("allData",searchSchema)

module.exports=SearchModal