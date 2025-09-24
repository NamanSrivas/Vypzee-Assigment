import axios from 'axios';
import { ShoppingItem, NewItemForm } from './types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const shoppingListAPI = {
  getItems: async (): Promise<ShoppingItem[]> => {
    const response = await api.get('/items');
    return response.data;
  },

  createItem: async (item: NewItemForm): Promise<ShoppingItem> => {
    const response = await api.post('/items', item);
    return response.data;
  },

  updateItem: async (id: string, updates: Partial<ShoppingItem>): Promise<ShoppingItem> => {
    const response = await api.put(`/items/${id}`, updates);
    return response.data;
  },

  deleteItem: async (id: string): Promise<void> => {
    await api.delete(`/items/${id}`);
  }
};