const express = require("express");
const router = express.Router();

const {
  createCart,
  getCard,
  updateCart,
  deleteCarts,
} = require("../controllers/cart");

router.route("/cart").post(createCart).delete(deleteCarts);
router.route("/cart:id").get(getCard).put(updateCart);

module.exports = router;
