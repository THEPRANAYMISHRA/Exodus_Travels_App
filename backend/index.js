const express = require("express")
const app = express()
const userRoutes = require("./routes/user.routes")
const searchRoutes = require("./routes/search.routes")
const bookingRoutes = require("./routes/booking.routes")
const connection = require("./db")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth.middleware')
require('dotenv').config()

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5501'
}));
app.use(express.json())

app.use("/user", userRoutes)
app.use("/search", searchRoutes)
app.use("/order", auth, bookingRoutes)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("failed to connect to db")
        console.log(error)
    }
    console.log("server is running at 4500")
})