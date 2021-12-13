const Cart = require("../models/cart");
const Products = require("../models/product");
const { ObjectId } = require("mongodb");
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

const getCart = async (req, res) => {
  let oldCart = await Cart.findById({ _id: req.params.id });
  res.status(200).json({ oldCart: oldCart });
};
//!to add products and change the quantity
const addCart = async (req, res) => {
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
      return { productId: product, quantity: obj.quantity + quantity };
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
//remove products
const removeCart = async (req, res) => {
  /*
user has to pass in the product id in the body 
find current cart
*/
  let { productId } = req.body;
  if (!productId) throw new error("invalid product id");
  let oldCart = await Cart.findById({ _id: req.params.id });

  let filterProducts = [...oldCart.products].filter(({ productId: p }) => {
    return productId != p && p != undefined;
  });
  const cart = await Cart.findByIdAndUpdate(req.params.id, {
    products: filterProducts,
  });

  res.status(200).json({ cart: cart.products });
};

// };

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
const deleteCarts = (req, res) => {
  const cart = Cart.findByIdAndDelete(req.params.id);
  res.status(200).json({ cart: [] });
};

module.exports = {
  createCart,
  getCart,
  deleteCarts,
  addCart,
  removeCart,
};
