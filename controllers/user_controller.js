
const {generateAccessToken} = require('../middleware/jwt_generate')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken");
const { Users } = require("./index");
const SECRET = process.env.SECRET

function get_users(req,res){
    Users.findAll()
    .then((users)=>{
        res.status(201).json(users)
    }).catch((err)=>{
        res.status(500).json({error:err.message})
    })
}

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
        const data = await Users.create({ firstname, lastname, email, password: hashed_password, role:0, is_verified:0});
        let token = generTokenateAccess(email, 0)
        send_mail(email, token)
        return res.status(201).json({message:'Registration successful'});
      }
    } catch (err) {
      return res.status(500).json({ error: 'Registration failed' });
    }
  }

  async function user_login(req, res){
    const {email, password} = req.body
    const user = await Users.findOne({where:{email}})
    console.log(user)
    if(!user){
        return res.status(400).json({message: "Invalid email or password"})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(validPassword){
        const token = generateAccessToken(email, user.is_verified, user.id, user.role)
       
        res.json({message: "Logged in", token: token})
    } else{
        return res.status(400).json({message: "Invalid email or password"})
    }
  }

  function send_mail(mail,token){
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "harutyunyanliana08@gmail.com",
            pass: "sqxdtzjyxsjfviym"
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