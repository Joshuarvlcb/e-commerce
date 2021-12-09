const mongoose = require("mongoose");

const Cart = new mongoose.Schema({
  /*
    []
    
    */
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", Cart);
