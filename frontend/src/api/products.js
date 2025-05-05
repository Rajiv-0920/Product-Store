import { baseApi } from "./base";

export const getProduct = async (id, { signal }) => {
  return await baseApi.get(`/products/${id}`, signal).then((res) => res.data);
};

export const getProducts = async ({ signal }) => {
  return await baseApi.get("/products/", signal).then((res) => res.data);
};

export const createProducts = async (data, { signal }) => {
  return await baseApi.post("/products/", data, signal).then((res) => res.data);
};

export const updateProducts = async (id, data, { signal }) => {
  return await baseApi
    .patch(`/products/${id}`, data, signal)
    .then((res) => res.data);
};

export const deleteProducts = async (id) => {
  return await baseApi.delete(`/products/${id}`).then((res) => res.data);
};
