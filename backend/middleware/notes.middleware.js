const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decode=jwt.verify(token, 'secret');
        if(decode){
            next()
        }else{
            res.status(400).send({"msg":"please login"})
        }
    }else{
        res.status(400).send({"msg":"please login"})
    }
}

module.exports=auth