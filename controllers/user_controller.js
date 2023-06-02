// const {Users} = require('../models')
const {generateAccessToken} = require('../middleware/jwt_generate')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken");
const { Users } = require("./index");
// const Users = require('../models/users');
const SECRET = process.env.SECRET

function get_users(req,res){
    Users.findAll()
    .then((users)=>{
        res.status(201).json(users)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}
// const getUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await Users.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
function get_users_id(req, res){
  const {id}=req.params
  Users.findOne({where:{id}})
  .then((users)=>{
      res.status(201).json(users)
  }).catch((err)=>{
      res.status(500).json({error:err.message})
  })
}
function post_users(req, res){
  const {firstname, lastname, email, password, role}=req.body
  Users.create({firstname, lastname, email, password, role})
  .then((users)=>{
      res.status(201).json(users)
  }).catch((err)=>{
      res.status(500).json({error:err.message})
  })
}

function update_users(req, res){
  const {firstname, lastname, email, password, role}=req.body
  const {id}=req.params
  Users.update({firstname: firstname, lastname: lastname, email: email, password:password, role: role}, {where:{id:id}})
  .then((users)=>{
      res.status(201).json(users)
  }).catch((err)=>{
      res.status(500).json({error:err.message})
  })
}

function delete_users(req,res){
    const {id}=req.params
    Users.destroy({where:{id}})
    .then((users)=>{
        res.status(201).json(users)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}


async function user_register(req, res) {
    const { firstname, lastname, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    try {
      const user = await Users.findOne({ where: { email: email } });
      if (user) {
        return res.status(400).json({ error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(password, salt);
    
      if (firstname !== "" && lastname !== "" && email !== "" && password !== "") {
        const data = await Users.create({ firstname, lastname, email, password: hashed_password, role:1, is_verified:1});
        let token = generateAccessToken(email, 0)
        send_mail(email, token)
        return res.status(201).json(data);
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  async function user_login(req, res){
    const {email, password} = req.body
    const user = await Users.findOne({where:{email}})
    if(!user){
        return res.status(400).send("Email is not correct")
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(validPassword){
        const token = generateAccessToken(email, user.is_verified, user.id, user.role)
       
        res.send(JSON.stringify({status: "Logged in", jwt:token}))
    } else{
        return res.status(400).send("Invalid password")
    }
  }

  function send_mail(mail,token){
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "harutyunyanliana08@gmail.com",
            pass: ""
        }
    })
    
    const mailOptions = {
        from: "harutyunyanliana08@gmail.com",
        to: mail,
        subject: "Sending Email using Node.js",
        text: `click http://localhost:5000/user/verify/${token}`
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        } else{
            console.log(`Email sent: ` + info.response)
        }
    })
  }

  async function verify(req, res) {
    const token = req.params.token;
    
    try {
    const decoded = jwt.verify(token, SECRET);
      const { email } = decoded;
      console.log(email)
      
      await Users.update({ is_verified: 1 }, { where: { email: decoded.email } });
      
      res.send("Email verified");
    } catch (err) {
      res.status(500).send("Error verifing email");
    }
  }

module.exports={
    get_users, get_users_id,  post_users, update_users, delete_users, user_register, user_login, verify
}