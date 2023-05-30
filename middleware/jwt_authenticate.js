// const jwt = require('jsonwebtoken')
// require('dotenv').config()
// const SECRET = process.env.SECRET

// function authenticateToken(req, res, next){
//     const token = req.headers.authorization
//     if(token == null){
//         return res.sendStattus(401)
//     }
//     jwt.verify(token, SECRET, (err, user)=>{
//         if(err){
//             return res.sendStatus(403)
//         }
//         if(user.role !== "admin"){
//             return res.sendStatus(403)
//         }
//         req.user=user
//         next()


//     })
// }

// module.exports = {
//     authenticateToken
// }

const jwt = require('jsonwebtoken');
const { Users } = require('../controllers');
require('dotenv').config();
const SECRET = process.env.SECRET;

function authenticateAdminToken(req, res, next) {
    const token = req.headers.authorization;
     const decodedtoken = jwt.verify(token,SECRET)
    
    if (token == null){
        return res.sendStatus(401)
    } 
    
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }
    
        if(decodedtoken.role === 1){
          next()
        } 
        else {
          return res.sendStatus(403)
      
        }
    })
   }




  

  function authenticateUserToken(req, res, next) {
    const token = req.headers.authorization;

    if (token == null){
        return res.sendStatus(401)
    } 
    
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }
        if(Users.role === 0 ){
          next()
        }
    })
  }

  
module.exports = {
  authenticateAdminToken,
  authenticateUserToken
}