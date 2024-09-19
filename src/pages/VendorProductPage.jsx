import CategorySelector from '../components/CategorySelector';
import ProductForm from '../components/ProductForm';
import ProductImageUpload from '../components/ProductImageUpload';
import ProductOptionForm from '../components/ProductOptionForm'; // 옵션 폼 컴포넌트 추가

const VendorProductPage = () => {
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

      {/* 이미지 업로드 섹션 */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Upload Product Images
        </h2>
        <ProductImageUpload />
      </div>

      {/* 상품 등록 폼 섹션 */}
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Product Information
        </h2>
        <ProductForm />
      </div>

      {/* 옵션 추가 섹션 */}
      <div className="p-8 bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          Product Options
        </h2>
        <ProductOptionForm />
      </div>
    </div>
  );
};

export default VendorProductPage;
