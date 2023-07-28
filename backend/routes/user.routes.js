const express = require("express")
const userRouter = express.Router()
const UserModal = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
var cookieParser = require('cookie-parser');
const saltRounds = 5
userRouter.use(cookieParser());
require('dotenv').config()
const auth = require('../middleware/auth.middleware')


//================================================================>
userRouter.post("/validate-token", auth, async (req, res) => {
    res.status(200).send({ "msg": "token is valid" })
})

//================================================================>
userRouter.post("/otp", async (req, res) => {
    const email = req.body.email;
    const regexEmail = new RegExp(email, "i");

    let isUserPresent = await UserModal.findOne({ email: regexEmail });

    if (isUserPresent) {
        return res.send({ "msg": "Email already registered!" });
    } else {
        try {
            let otp = generateOTP();
            res.cookie('otp', otp, { httpOnly: true, sameSite: 'none', secure: true });
            sendEmail(email, otp);
            res.status(200).send({ "msg": "OTP sent to email successfully!" });
        } catch (error) {
            res.status(400).send({ "msg": "OTP couldn't be sent!" });
        }
    }

})

//==============================================================

userRouter.post("/verify", async (req, res) => {
    let { name, email, pass, otp } = req.body

    const originalOTP = req.cookies.otp;

    try {
        if (originalOTP == otp) {
            bcrypt.hash(pass, saltRounds, async (err, hash) => {
                if (hash) {
                    let newUser = await UserModal({ name, email, pass: hash })
                    await newUser.save()
                    return res.send({ "msg": "Registration successful!" })
                }
            });
        } else {
            return res.send({ "msg": "OTP is invalid!" })
        }
    } catch (error) {
        res.status(400).send({ "msg": "Registration failed!" })
    }
})

//=================================================================>
userRouter.post('/login', async (req, res) => {
    let { email, pass } = req.body
    try {
        const user = await UserModal.findOne({ email: email })

        if (!user) {
            return res.status(404).send({ "msg": "User not found" })
        }
        if (user) {
            try {
                bcrypt.compare(pass, user.pass, async (err, result) => {
                    if (result) {
                        let token = jwt.sign({ email: email }, 'secret', { expiresIn: 60 * 60 })
                        // res.cookie('jwt', token, { httpOnly: true, sameSite: 'none', secure: true })
                        return res.status(200).send({ "msg": "Login Successful!", "name": user.name, "token": token })
                    } else {
                        return res.status(400).send({ "msg": "wrong password" })
                    }
                });
            } catch (err) {
                return res.status(400).send({ "msg": "wrong password" })
            }
        }
    } catch (error) {
        res.status(400).send({ "msg": "login failed!" })
    }
})


function sendEmail(receiver, otp) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pmcanvas4501@gmail.com',
            pass: process.env.nodemailer
        }
    });

    var mailOptions = {
        from: 'exodustravels@gmail.com',
        to: receiver,
        subject: 'Exodus Travel Registration',
        text: 'This is your OTP for verification!',
        html: `<h3>This is your OTP for verification!</h3><br>
        <h1>${otp}</h1>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return error
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}


module.exports = userRouter