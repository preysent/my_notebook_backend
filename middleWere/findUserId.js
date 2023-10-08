
// jesonWebTokan
var jwt = require('jsonwebtoken');
const JWT_STR = "doing my work"

const findUserId = async (req, res, next) => {

    // getting user from jwt token and adding it to req object
    const token = req.header('auth_token')

    if (!token) {
        return res.status(401).json("pleace authenticate using valid user token")
    }
    try {
        var data = jwt.verify(token, JWT_STR);
        req.user = data.user

        next()
    }
    catch (err) {
        console.log(err.message)
        return res.status(402).json("pleace authenticate using valid user token")
    }
}

module.exports = findUserId