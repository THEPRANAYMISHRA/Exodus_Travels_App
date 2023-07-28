const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    if (token) {
        const decode = jwt.verify(token, 'secret');
        if (decode) {
            req.body.email = decode.email
            next()
        } else {
            res.status(400).send({ "msg": "Token expired please login again!" })
        }
    } else {
        res.status(400).send({ "msg": "Please login to continue!" })
    }
}

module.exports = auth