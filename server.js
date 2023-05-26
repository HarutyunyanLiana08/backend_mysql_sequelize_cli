const express = require('express');
const app = express();
app.use(express.json());
const cors = require("cors")
app.use(cors())
app.use(express.json());
const categories_router = require('./routes/categories_routes')
const product_router = require('./routes/product_routes')
// const cart_router = require('./routes/cart_routes')

const users_router = require('./routes/user_routes')

//const nodemailer = require("nodemailer")

app.use('/category',categories_router)
app.use('/product', product_router)
app.use('/user', users_router)



// app.use("/"  ,routes)
// app.use(cors({origin:`http://locallhost:3000)`}))  


app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  }); 