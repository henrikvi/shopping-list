import axios from 'axios';

const items = axios.create({
  baseURL: 'http://localhost:3001/items',
});

const getAllItems = async () => {
  const response = await items.get();
  return response.data;
};

const addItem = async (newItem) => {
  const response = await items.post('', newItem);
  return response.data;
};

const updateItem = async (updatedItem) => {
  const response = await items.put(updatedItem.id.toString(), updatedItem);
  return response.data;
};

const deleteItem = async (id) => {
  const response = await items.delete(id.toString());
  return response.data;
};

export default {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
};
