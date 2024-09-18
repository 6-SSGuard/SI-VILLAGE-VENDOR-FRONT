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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto space-y-6 p-4 border rounded-lg shadow-md"
    >
      <div className="flex flex-col">
        <label htmlFor="productName" className="mb-1 font-medium">
          Product Name
        </label>
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

      <div className="flex flex-col">
        <label className="mb-1 font-medium">Price</label>
        <input
          type="number"
          placeholder="Enter product price"
          {...register('price', { required: true })}
          className={`border p-2 rounded-md ${
            errors.price ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.price && (
          <span className="text-red-500 mt-1">This field is required</span>
        )}
      </div>

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
