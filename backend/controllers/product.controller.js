import mongoose from "mongoose";
import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("Error in fetching product: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.log("Error in fetching products: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  try {
    if (!name || !price || !image) {
      return res
        .status(404)
        .json({ success: false, message: "Please provide all the fields." });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newProduct = new Product({
      name: name,
      price: price,
      image: imageUrl,
    });
    await newProduct.save();
    res.status(200).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error in Post (/products) Route: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productUpdates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: productUpdates },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error in patch (/products/:id) Route: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error in Delete (/products/:id) Route: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
