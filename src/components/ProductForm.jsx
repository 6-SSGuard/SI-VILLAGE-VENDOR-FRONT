import { useForm } from 'react-hook-form';
import { submitProductData } from '../api/ProductApi';

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    submitProductData(data)
      .then(() => {
        alert('Product submitted successfully!');
      })
      .catch((error) => {
        console.error('Error submitting product:', error);
      });
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

      {/* Vendor Name */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Vendor Name</label>
        <input
          type="text"
          placeholder="Enter vendor name"
          {...register('vendorName', { required: true })}
          className={`border p-2 rounded-md ${
            errors.vendorName ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.vendorName && (
          <span className="text-red-500 mt-1">This field is required</span>
        )}
      </div>

      {/* Main View */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Main View</label>
        <input type="checkbox" {...register('mainView')} className="h-5 w-5" />
      </div>

      {/* New Product */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">New Product</label>
        <input
          type="checkbox"
          {...register('newProduct')}
          className="h-5 w-5"
        />
      </div>

      {/* Display */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Display</label>
        <input type="checkbox" {...register('display')} className="h-5 w-5" />
      </div>

      {/* Max Order Count */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Max Order Count</label>
        <input
          type="number"
          placeholder="Enter max order count"
          {...register('maxOrderCount', { required: true })}
          className={`border p-2 rounded-md ${
            errors.maxOrderCount ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.maxOrderCount && (
          <span className="text-red-500 mt-1">This field is required</span>
        )}
      </div>

      {/* Min Order Count */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Min Order Count</label>
        <input
          type="number"
          placeholder="Enter min order count"
          {...register('minOrderCount', { required: true })}
          className={`border p-2 rounded-md ${
            errors.minOrderCount ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.minOrderCount && (
          <span className="text-red-500 mt-1">This field is required</span>
        )}
      </div>

      {/* Discount Rate */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Discount Rate (%)</label>
        <input
          type="number"
          step="0.01"
          placeholder="Enter discount rate"
          {...register('discountRate', { required: true })}
          className={`border p-2 rounded-md ${
            errors.discountRate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.discountRate && (
          <span className="text-red-500 mt-1">This field is required</span>
        )}
      </div>

      {/* Purchase Price */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Purchase Price</label>
        <input
          type="number"
          step="0.01"
          placeholder="Enter purchase price"
          {...register('purchasePrice', { required: true })}
          className={`border p-2 rounded-md ${
            errors.purchasePrice ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.purchasePrice && (
          <span className="text-red-500 mt-1">This field is required</span>
        )}
      </div>

      {/* Selling Price */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Selling Price</label>
        <input
          type="number"
          step="0.01"
          placeholder="Enter selling price"
          {...register('sellingPrice', { required: true })}
          className={`border p-2 rounded-md ${
            errors.sellingPrice ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.sellingPrice && (
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
