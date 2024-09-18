import axios from 'axios';

const API_URL = '/api/products'; // 서버에 설정된 엔드포인트

export const submitProductData = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/vendor/add`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
