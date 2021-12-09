const Product = require("../models/product");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
};

const filterProducts = (req, res) => {
  //get params
};

const deleteProduct = (req, res) => {
  //get id
};

const getProduct = (req, res) => {
  //get id
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({
    products: [...products],
  });
};

const updateProduct = (req, res) => {
  //get id
};

module.exports = {
  createProduct,
  filterProducts,
  deleteProduct,
  getProduct,
  getAllProducts,
  updateProduct,
};
