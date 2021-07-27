import axios from 'axios';

const items = axios.create({
  baseURL: 'http://localhost:3001/items',
});

const getAllItems = async () => {
  const response = await items.get();
  return response.data;
};

export default { getAllItems };
