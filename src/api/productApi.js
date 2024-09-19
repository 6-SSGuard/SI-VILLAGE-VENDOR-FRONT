import axios from 'axios';

export const submitProductData = async (data) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/product',
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
    await axios.post(
      'http://localhost:8080/api/vendor/product/option',
      optionData
    );
  } catch (error) {
    console.error('Error submitting product options:', error);
    throw error;
  }
};

export const fetchCategories = async (parentCategoryCode) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/category/sub-categories`,
      {
        params: { parentCategoryCode },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error('Failed to fetch categories', error);
    throw error;
  }
};

// 상품과 카테고리를 매핑하는 로직
export const submitProductCategories = async (
  selectedCategories,
  productCode
) => {
  const requestBody = {
    topCategoryCode: selectedCategories[0]?.categoryCode || '',
    middleCategoryCode: selectedCategories[1]?.categoryCode || '',
    bottomCategoryCode: selectedCategories[2]?.categoryCode || '',
    subCategoryCode: selectedCategories[3]?.categoryCode || '',
    productCode,
  };

  try {
    await axios.post(
      'http://localhost:8080/api/vendor/product-category-list',
      requestBody
    );
    alert('Product successfully mapped to categories!');
  } catch (error) {
    console.error('Failed to map product to categories', error);
    throw error;
  }
};
