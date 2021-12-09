const Cart = require("../models/cart");
const Products = require("../models/product");

//if user doesnt have a cart cart
const createCart = async (req, res) => {
  //find the product id
  //   let name = req.name;
  //   let quantity = req.quantity;
  //   let id = await Products.findById({ name });
  //pass in the quanity
  const cart = await Cart.create({ products: [] });

  res.status(200).json({ cart: [cart] });
};

const getCard = async (req, res) => {};
//if user has a cart check to see if he is adding or updating quantity
const updateCart = (req, res) => {};
// const getCart = async(req, res) => {
//     let cart = await Cart.findById({id:req.id});
// }

//when user submits a order
const deleteCarts = (req, res) => {};

module.exports = {
  createCart,
  getCard,
  updateCart,
  deleteCarts,
};
