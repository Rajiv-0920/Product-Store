import { baseApi } from "./base";

export const getProduct = async (id, { signal }) => {
  return await baseApi.get(`/${id}`, signal).then((res) => res.data);
};

export const getProducts = async ({ signal }) => {
  return await baseApi.get("/", signal).then((res) => res.data);
};

export const createProducts = async (data, { signal }) => {
  return await baseApi.post("/", data, signal).then((res) => res.data);
};

export const updateProducts = async (id, data, { signal }) => {
  return await baseApi.patch(`/${id}`, data, signal).then((res) => res.data);
};

export const deleteProducts = async (id) => {
  return await baseApi
    .delete(`http://localhost:5000/api/products/${id}`)
    .then((res) => res.data);
};
