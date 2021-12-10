const express = require("express");
const router = express.Router();
const {
  createProduct,
  filterProducts,
  deleteProduct,
  getProduct,
  getAllProducts,
  updateProduct,
} = require("../controllers/product");

router
  .route("/product")
  .get(getAllProducts)
  .post(createProduct)
  .get(filterProducts);
router
  .route("/product/:id")
  .delete(deleteProduct)
  .put(updateProduct)
  .get(getProduct);

module.exports = router;
