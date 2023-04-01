const express=require("express")
const app=express()
const userRoutes=require("./routes/user.routes")
const searchRoutes=require("./routes/search.routes")
const bookingRoutes=require("./routes/booking.routes")
const connection=require("./db")
const jwt=require("jsonwebtoken")
const cors=require("cors")

app.use(cors())
app.use(express.json())
app.use("/users",userRoutes)
app.use("/search",searchRoutes)
app.use("/trip",bookingRoutes)

app.get("/",(req,res)=>{
    res.send({"msg":"You are on the home page"})
})

app.listen(4500,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("failed to connect to db")
        console.log(error)
    }

    console.log("server is running")
})