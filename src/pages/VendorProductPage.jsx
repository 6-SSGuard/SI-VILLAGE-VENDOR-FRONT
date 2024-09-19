import React, { useState } from 'react';
import CategorySelector from '../components/CategorySelector';
import ProductForm from '../components/ProductForm';
import ProductImageUpload from '../components/ProductImageUpload';
import ProductOptionForm from '../components/ProductOptionForm';
import axios from 'axios';

const VendorProductPage = () => {
  const [productCode, setProductCode] = useState(null); // productCode 상태 관리

  const handleProductCodeReceived = (code) => {
    setProductCode(code); // 생성된 productCode 저장
  };

  return (
    <div className="container mx-auto p-6">
      {/* 헤더 */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-10 text-center">
        Vendor Product Registration
      </h1>

      {/* 카테고리 선택 섹션 */}
      <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Select Category
        </h2>
        <CategorySelector />
      </div>

      {/* 상품 정보 입력 섹션 */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Product Information
        </h2>
        <ProductForm onProductCodeReceived={handleProductCodeReceived} />
      </div>

      {/* productCode가 반환되었을 때 렌더링 */}
      {productCode && (
        <div className="mt-6 p-4 bg-green-100 rounded-lg text-green-800 text-center">
          <p>
            Product Code: <strong>{productCode}</strong>
          </p>
        </div>
      )}

      {/* 이미지 업로드 섹션 */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Upload Product Images
        </h2>
        <ProductImageUpload productCode={productCode} />{' '}
        {/* productCode 전달 */}
      </div>

      {/* 옵션 추가 섹션 */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Product Options
        </h2>
        <ProductOptionForm productCode={productCode} />
      </div>
    </div>
  );
};

export default VendorProductPage;
