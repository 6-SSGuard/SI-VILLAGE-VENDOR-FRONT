import { useForm } from 'react-hook-form';
import { submitProductData } from '../api/ProductApi';
import { useState } from 'react';

const ProductForm = ({ onProductCodeReceived }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const productCode = await submitProductData(data); // 서버에서 받은 productCode
      alert('Product submitted successfully!');
      console.log('Product Code:', productCode);
      onProductCodeReceived(productCode); // productCode를 상위 컴포넌트에 전달
    } catch (error) {
      console.error('Error submitting product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Product Name */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          {...register('productName', { required: true })}
          className={`border p-2 rounded-md ${
            errors.productName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.productName && (
          <span className="text-red-500 mt-1">This field is required</span>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Price</label>
        <input
          type="number"
          placeholder="Enter price"
          {...register('price', { required: true })}
          className={`border p-2 rounded-md ${
            errors.price ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.price && (
          <span className="text-red-500 mt-1">This field is required</span>
        )}
      </div>

      {/* Brand ID */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Brand ID</label>
        <input
          type="number"
          placeholder="Enter brand ID"
          {...register('brandId', { required: true })}
          className={`border p-2 rounded-md ${
            errors.brandId ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.brandId && (
          <span className="text-red-500 mt-1">This field is required</span>
        )}
      </div>

      {/* Detail Content */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Detail Content</label>
        <textarea
          placeholder="Enter detail content"
          {...register('detailContent', { required: true })}
          className={`border p-2 rounded-md ${
            errors.detailContent ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.detailContent && (
          <span className="text-red-500 mt-1">This field is required</span>
        )}
      </div>

      {/* Color ID */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Color ID</label>
        <input
          type="number"
          placeholder="Enter color ID"
          {...register('colorId', { required: true })}
          className={`border p-2 rounded-md ${
            errors.colorId ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.colorId && (
          <span className="text-red-500 mt-1">This field is required</span>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
