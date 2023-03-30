const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb+srv://thepranaymishra:khushboopranay@cluster0.d0rtufh.mongodb.net/expedia?retryWrites=true&w=majority")

module.exports=connection
