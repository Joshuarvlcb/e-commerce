const Product = require("../models/product");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    product,
  });
};

//! this is when i add 1000 items
const filterProducts = (req, res) => {
  //get params
};

const deleteProduct = async (req, res) => {
  //get id
  const product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ product: [] });
};

const getProduct = async (req, res) => {
  //get id
  const product = await Product.findById(req.params.id);
  res.status(200).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({
    products: [...products],
  });
};

const updateProduct = async (req, res) => {
  //get id
  const { name, price, description, image } = req.body;
  if (!name || !price || !description || !image)
    throw new Error("body is messed up");
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    {
      new: true,
    }
  );
  if (!product) throw new Error("Issue with product id");
  res.status(200).json({ product: product });
};

module.exports = {
  createProduct,
  filterProducts,
  deleteProduct,
  getProduct,
  getAllProducts,
  updateProduct,
};
