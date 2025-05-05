import React from "react";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { createProducts } from "../api/products";
import ProductForm from "../components/ProductForm";

const CreatePage = () => {
  const data = {
    title: "Create New Product",
    submitText: "Add Product",
    product: {},
  };
  return <ProductForm {...data} />;
};

async function action({ request }) {
  const formData = await request.formData();

  const name = formData.get("name");
  const price = parseFloat(formData.get("price"));
  const image = formData.get("image");

  if (!name) return toast.error("Please enter all required details.");

  if (!isNaN(price) && price <= 0)
    return toast.error("Price must be a number greater than zero.");

  await createProducts({ name, price, image }, request.signal);
  toast.success("Product created successfully");

  return redirect("/");
}

export const createPageRoute = {
  element: <CreatePage />,
  action,
};
