const express = require("express");
const router = express.Router();

const {
  createCart,
  getCart,
  addCart,
  deleteCarts,
  removeCart,
} = require("../controllers/cart");

router.route("/cart").post(createCart).delete(deleteCarts);
router.route("/cart/:id").get(getCart).put(addCart).delete(removeCart);

module.exports = router;
