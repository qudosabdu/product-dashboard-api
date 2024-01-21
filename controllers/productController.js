const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  console.log("user info: ", req.userInfo);
  const body = req.body;
  try {
    const product = new Product(body);
    const result = await product.save();
    res.status(201).json({
      message: "Product created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      message: "All products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const productUpdate = { $set: { ...body } };
    productUpdate.updatedAt = Date.now();

    const result = await Product.findByIdAndUpdate(id, productUpdate);
    res.status(200).json({
      message: "Product updated successfully",
      result,
    });
    res.status(200).json({
      message: "Product updated successfully",
      result,
    });
  } catch (error) {}
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "Product deleted successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
