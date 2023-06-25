const {Products} = require('./index');
const fs=require('fs');
const upload = require('../middleware/multer')


async function getAllProducts (req, res) {
  
  try {
   
    const products = await Products.findAll();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


async function getProductById (req, res) {
  
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


async function createProduct(req, res) {
  const { name, price,description,quantity, categoryId } = req.body;

const image = req.file && req.file.path

  try {
  
    const product = await Products.create({ name, price,image,description,quantity,categoryId });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}


function updateProduct(req, res) {
  upload.single('image')(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error updating product' });
    }
    const { id } = req.params;
    const { name, price, description, quantity, categoryId } = req.body;
    const image = req.file && req.file.path

    Products.update({name, price,image, description,quantity,categoryId}, {where:{id:id}}).then((product)=>{
              res.status(201).json(product)
         }).catch((err)=>{
             res.status(500).json({error:err.message})})
  });
}


async function deleteProduct(req, res)  {
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    await product.destroy();
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct}
