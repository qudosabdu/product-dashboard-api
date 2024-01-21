const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const ensureAuthenticated = require("../auth");
const router = express.Router();

router.post("/", ensureAuthenticated, createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", ensureAuthenticated, updateProduct);
router.delete("/:id", ensureAuthenticated, deleteProduct);

module.exports = router;
