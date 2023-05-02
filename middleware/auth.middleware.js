const jwt = require("jsonwebtoken")

const Auth = (req,res,next)=>{
    let token = req.headers.authorization

    if (token) {
        token = token.split(" ")[1]
        jwt.verify(token, "bharat", function (err, decoded) {
            if (decoded) {
                req.body.userID = decoded.userID
                req.body.userName = decoded.userName

                next()
            } else {
                res.send("invalid token")
            }
        })
    } else{
        res.send("please provide token")
    }
}

module.exports = Auth