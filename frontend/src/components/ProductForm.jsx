import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import { toast } from "react-toastify";
import { DropZone } from "./DropZone";

const ProductForm = ({
  title,
  submitText,
  product: { name, price, image },
}) => {
  const nameRef = useRef();
  const priceRef = useRef();
  const [preview, setPreview] = useState(image);
  const [selectedFile, setSelectedFile] = useState(null);

  const fetcher = useFetcher();
  const { state } = fetcher;
  const formRef = useRef();

  useEffect(() => {
    if (name && price && image) {
      nameRef.current.value = name;
      priceRef.current.value = price;
      setPreview(image);
    }
  }, [name, price, image]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nameRef.current.value);
    formData.append("price", priceRef.current.value);
    if (selectedFile) formData.append("image", selectedFile);
    else if (preview) formData.append("image", preview);
    else return toast.error("Please upload an image (maximum size: 2MB).");

    fetcher.submit(formData, { method: "post" });
  }

  return (
    <fetcher.Form
      className="create-product-form"
      method="post"
      encType="multipart/form-data"
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <h1 className="title">{title}</h1>
      <div className="product-name">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter product name"
          ref={nameRef}
        />
      </div>
      <div className="product-price">
        <label htmlFor="price">Product Price</label>
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Enter product price"
          ref={priceRef}
        />
      </div>
      <div>
        <label htmlFor="image">Select Product Image</label>
        <DropZone
          setPreview={setPreview}
          setSelectedFile={setSelectedFile}
          name="image"
        />
      </div>
      {preview ? (
        <img
          src={preview}
          alt="Product Image"
          style={{
            height: "100px",
            width: "100px",
            borderRadius: "5px",
            objectFit: "contain",
          }}
        />
      ) : (
        ""
      )}

      {state === "submitting" ? (
        <Button
          fullWidth
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
        ></Button>
      ) : (
        <Button type="submit" fullWidth>
          {submitText}
        </Button>
      )}
    </fetcher.Form>
  );
};

export default ProductForm;
