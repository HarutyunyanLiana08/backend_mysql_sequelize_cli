const express = require('express');
const app = express();
app.use(express.json());
const cors = require("cors")
app.use(cors())
app.use(express.json());
const fs = require('fs')
const routes = require('./routes/routes')
app.use("/"  ,routes)
// app.use(cors({origin:`http://locallhost:3000)`}))  

app.get('/images/:name',(req,res)=>{
  const image_name = req.params.name;
  
  fs.readFile(`./images/${image_name}`, function(err, data) {
      if (err) throw err;
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data); 
    });
});

  app.listen(5000, () => {
    console.log('Server running on port 5000');
  }); 