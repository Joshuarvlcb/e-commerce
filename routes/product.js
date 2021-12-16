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

const { uploadProductImage } = require("../controllers/upload");

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

router.route("/upload").post(uploadProductImage);
module.exports = router;
