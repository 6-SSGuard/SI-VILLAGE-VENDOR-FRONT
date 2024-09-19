import CategorySelector from '../components/CategorySelector';
import ProductForm from '../components/ProductForm';

const VendorProductPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Vendor Product Registration
      </h1>

      <div className="mb-6">
        <CategorySelector />
      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <ProductForm />
      </div>
    </div>
  );
};

export default VendorProductPage;
