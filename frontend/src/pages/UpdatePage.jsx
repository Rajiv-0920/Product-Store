import React from "react";
import ProductForm from "../components/ProductForm.jsx";
import { getProduct, updateProducts } from "../api/products.js";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

const UpdatePage = () => {
  const product = useLoaderData();
  const data = {
    title: "Update Product",
    submitText: "Update Product",
    product,
  };
  return <ProductForm {...data} />;
};

async function loader({ request: { signal }, params }) {
  const product = await getProduct(params.id, { signal });

  const name = product.data.name;
  const price = product.data.price;
  const image = product.data.image;

  return { name, price, image };
}

async function action({ request, params }) {
  const formData = await request.formData();

  const name = formData.get("name");
  const price = formData.get("price");
  const image = formData.get("image");

  if (!name || !price) {
    return toast.error("Please enter all required details.");
  }

  if (isNaN(price) || Number(price) <= 0) {
    return toast.error("Price must be a number greater than zero.");
  }

  const productUpdate = { name, price, image };

  await updateProducts(params.id, productUpdate, request.signal);

  toast.success("Product updated successfully");

  return redirect("/");
}

export const updatePageRoute = {
  element: <UpdatePage />,
  loader,
  action,
};
