import axios, { AxiosResponse } from "axios";
import { FetchProduct, Product } from "../types/Product";

export const fetchProducts = async (skip = 1, limit = 10): Promise<FetchProduct> => {
  const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  const result = await axios.get<FetchProduct>(url);
  return result.data;
};


export const addProducts = async (product: Product): Promise<AxiosResponse<Product>> => {
  const result = await axios.post<Product>('https://dummyjson.com/products/add', product);
  return result;
};