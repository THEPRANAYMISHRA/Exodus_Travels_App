const express=require("express")
const userRouter=express.Router()
const UserModal=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');

//================================================================>
userRouter.post("/signup",async(req,res)=>{
    let {name,email,pass}=req.body
    try {
        bcrypt.hash(pass,3,async(err, hash)=> {
            try {
                const user=new UserModal({name,email,pass:hash})
                await user.save()
                res.status(200).send({"msg":"signup successful!"})
            } catch (error) {
                res.status(400).send({"msg":"Something went wrong!"})
            }
        });
    } catch (error) {
        res.status(400).send({"msg":"signup failed!"})
    }
})

//=================================================================>
userRouter.post('/login',async(req,res)=>{
    let {email,pass}=req.body
    try {
        const user=await UserModal.findOne({email:email})
        if(!user){
            return res.status(404).send({"msg":"User not found"})
        }
        if(user){
            bcrypt.compare(pass,user.pass,async(err, result)=>{
                if(result){
                    res.status(200).send({"msg":"login complete!","name":user.name,"userId":user.userId,"token":jwt.sign({userId:user._id}, 'secret', { expiresIn: 60 * 60 })})
                }else{
                    res.status(400).send({"msg":"wrong password"})
                }
            });
        }
    } catch (error) {
        res.status(400).send({"msg":"login failed!"})
    }
})

module.exports=userRouter