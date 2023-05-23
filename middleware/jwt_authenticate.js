const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.SECRET

function authenticateToken(req, res, next){
    const token = req.headers.authorization
    if(token == null){
        return res.sendStattus(401)
    }
    jwt.verify(token, SECRET, (err, user)=>{
        if(err){
            return res.sendStatus(403)
        }
        if(user.role !== "admin"){
            return res.sendStatus(403)
        }
        req.user=user
        next()
    })
}

module.exports = {
    authenticateToken
}