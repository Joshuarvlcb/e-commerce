const express = require("express");
const router = express.Router();

const {
  createCart,
  getCard,
  addCart,
  deleteCarts,
} = require("../controllers/cart");

router.route("/cart").post(createCart).delete(deleteCarts);
router.route("/cart/:id").get(getCard).put(addCart);

module.exports = router;
