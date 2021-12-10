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

const getCard = async (req, res) => {
  let oldCart = await Cart.findById({ _id: req.params.id });
  res.status(200).json({ oldCart: oldCart });
};
//if user has a cart check to see if he is adding or updating quantity
//add cart
//remove cart
//change quanitity
const addCart = async (req, res) => {
  //we get old cart
  //add cart
  /*
  req.body be a object 
  */

  //!laptop 61b279d2ddf38bbb7c7d228f
  let { product, quantity } = req.body;
  if (!product) throw new Error("no product found");
  if (!quantity) throw new Error("no quantity");
  let oldCart = await Cart.findById({ _id: req.params.id });
  if (!oldCart) throw new Error("id is incorrect");
  if (
    oldCart.products.find(({ productId }) => {
      return product == productId;
    })
  ) {
    oldCart.products = oldCart.products.map((obj) => {
      if (obj.productId != product) return obj;
      return { productId: product, quantity: obj.quantity + 1 };
    });
    console.log(oldCart.products);
    let cart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        products: oldCart.products,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({ cart: [cart] });
  }
  let newProducts = [
    ...oldCart.products,
    {
      productId: product,
      quantity,
    },
  ];
  let cart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      products: newProducts,
    },
    {
      new: true,
    }
  );

  res.status(200).json({ cart: [cart] });
};
const removeCart = (req, res) => {};

// const getCart = async (req, res) => {
//   //findOneById
//   let oldCart = await Cart.findById({ id: req.params.id });
//   //i need to delete add and update cart

//   let cart = await Cart.findOneAndUpdate({
//     id: req.id,
//     products: [...oldCart, req.body],
//   });
// };

//when user submits a order
const deleteCarts = (req, res) => {};

module.exports = {
  createCart,
  getCard,
  deleteCarts,
  addCart,
};
