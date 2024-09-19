import axios from 'axios';

export const submitProductData = async (data) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/product/',
      data
    );
    alert('Product information submitted successfully!');
    const productCode = response.data.result?.productCode; // 응답에서 productCode 추출
    return productCode;
  } catch (error) {
    console.error('Error submitting product information:', error);
  }
};

// 이미지 리스트를 서버로 전송하는 함수
export const submitProductImages = async (imageData) => {
  try {
    await axios.post(
      'http://localhost:8080/api/vendor/product/image',
      imageData
    );
  } catch (error) {
    console.error('Error submitting product images:', error);
    throw error;
  }
};

// 옵션 데이터를 서버로 전송하는 함수
export const submitProductOptions = async (optionData) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/vendor/product/option',
      optionData
    );
  } catch (error) {
    console.error('Error submitting product options:', error);
    throw error;
  }
};
