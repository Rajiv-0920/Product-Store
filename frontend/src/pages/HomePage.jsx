import React, { createContext, useState } from "react";
import { getProducts } from "../api/products.js";
import { Link, useLoaderData } from "react-router-dom";
import { ProductCard } from "../components/ProductCard.jsx";

export const Products = createContext();

const HomePage = () => {
  const loaderData = useLoaderData().data;
  const [products, setProducts] = useState(loaderData);

  return products.length ? (
    <Products.Provider value={{ products, setProducts }}>
      <section className="product-section">
        <h2>Current Available Products</h2>
        <ul className="products">
          {products.map((product) => {
            return <ProductCard key={product._id} {...product} />;
          })}
        </ul>
      </section>
    </Products.Provider>
  ) : (
    <div className="no-product-section">
      <h2>No products available</h2>
      <p>
        Try again later or{" "}
        <Link to="/create" className="add-product">
          add a new product.
        </Link>
      </p>
    </div>
  );
};

function loader({ request: { signal } }) {
  return getProducts({ signal });
}

export const homePageRoute = {
  element: <HomePage />,
  loader,
  errorElement: <div>Something went wrong</div>,
};
