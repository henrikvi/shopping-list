import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3001/items',
});

const getAllItems = async () => {
  const response = await client.get();
  return response.data;
};

export default { getAllItems };
