const {Products} = require('./index');

// Get all products
async function getAllProducts (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  try {
    // include:category
    const products = await Products.findAll();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a single product by ID
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

// Create a new product

async function createProduct(req, res){
  const{name, price, description,quantity,categoryId   } =req.body
  const img = `uploads/products/${req.file.filename}`;
  const data = await Products.create({name, price, description, quantity, categoryId})
  
  const imgUrl = `${req.protocol}://${req.hostname}:5000/${img}`;
  console.log(imgUrl)
      data.img = imgUrl;
      return res.status(201).json({ message: 'Product created', data });
}
// async function createProduct(req, res) {
//   const { name, price,description,quantity, categoryId } = req.body;
 
//   console.log(name,description)
//   console.log(req)
//   try {
  
//     const product = await Product.create({ name, price,image:req.file.originalname,description,quantity,categoryId });
//     res.json(product);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// }
// Update an existing product by ID
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, price, description, quantity, categoryId } = req.body;
    const img = `uploads/products/${req.file.filename}`;

    const oldData = await Products.findOne({where:{id}})
    const filepath = "_" + oldData.img
    fs.unlink(filepath, (err)=>{
      if(err){
          console.log(err)
      }
    })
    const data = await Products.update(
      { name, price, description, quantity, categoryId },
      { where: { id } }
    );

    const imgUrl = `${req.protocol}://${req.hostname}:5000/${img}`;
    console.log(imgUrl);
    
    data.img = imgUrl;
    res.status(201).json({ message: 'Product updated', data });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
}

// Delete an existing product by ID

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
