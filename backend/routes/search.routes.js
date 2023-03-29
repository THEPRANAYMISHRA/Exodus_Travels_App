const express=require("express")
const searchRouter=express.Router()
const SearchModal=require("../model/serach.model")

searchRouter.get("/available",async(req,res)=>{
    let {from,to,checkIn,checkOut,Travellers}=req.body
    
    
})

module.exports=searchRouter
