import api from './api';
import { type Product } from '../types/Product';

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/productos');
  return response.data;
};

export const getTotalValue = async (): Promise<number> => {
  const response = await api.get('/productos/inventario/valor-total');
  return response.data;
};

export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  const response = await api.post('/productos', productData);
  return response.data;
};

export const updateProduct = async (id: number, productData: Product): Promise<Product> => {
  const response = await api.put(`/productos/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/productos/${id}`);
};