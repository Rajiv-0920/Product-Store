import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { deleteProducts } from "../api/products";
import { toast } from "react-toastify";
import { Products } from "../pages/HomePage";

export const ProductCard = ({ _id, name, image, price }) => {
  let { products, setProducts } = useContext(Products);

  const handleDelete = async () => {
    try {
      await deleteProducts(_id); // Call API to delete product
      setProducts(products.filter((product) => product._id !== _id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  return (
    <li className="product">
      <div className="product-img-container">
        <img src={image} alt="" className="product-img" />
      </div>
      <div className="product-details">
        <span className="name">{name}</span>
        <span className="price">₹ {price}</span>
      </div>
      <div className="product-actions">
        <Link className="btn edit" to={`/update/${_id}`}>
          Edit Product
        </Link>
        <button className="btn delete" onClick={handleDelete}>
          Delete Product
        </button>
      </div>
    </li>
  );
};
