import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitProductOptions } from '../api/ProductApi';

const ProductOptionForm = ({ productCode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [options, setOptions] = useState([
    { sizeId: '', volume: '', stock: '', soldOut: false, dangerStock: '' },
  ]);

  // 옵션 추가 핸들러
  const addOption = () => {
    setOptions([
      ...options,
      { sizeId: '', volume: '', stock: '', soldOut: false, dangerStock: '' },
    ]);
  };

  // 옵션 제거 핸들러
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  // 폼 제출 핸들러
  const onSubmit = async (data) => {
    const optionData = options.map((_, index) => {
      const { sizeId, volume, stock, soldOut, dangerStock } =
        data.options[index]; // data에서 options 배열을 참조

      return {
        sizeId,
        volume,
        stock,
        soldOut,
        dangerStock,
        productCode,
      };
    });

    console.log('Sending option data:', optionData); // 실제 전송되는 데이터 구조 확인

    try {
      await submitProductOptions(optionData); // API 요청
      alert('Product options submitted successfully!');
    } catch (error) {
      console.error('Error submitting product options:', error);
      alert('Failed to submit product options.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {options.map((option, index) => (
        <div key={index} className="border p-4 mb-4 rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Option {index + 1}</h3>

          {/* sizeId */}
          <div className="mb-3">
            <label className="block text-gray-700">Size ID</label>
            <input
              type="number"
              {...register(`options[${index}].sizeId`)}
              placeholder="Enter size ID"
              className={`border p-2 w-full rounded-lg ${
                errors?.options?.[index]?.sizeId
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
          </div>

          {/* volume */}
          <div className="mb-3">
            <label className="block text-gray-700">Volume</label>
            <input
              type="text"
              {...register(`options[${index}].volume`, { required: true })}
              placeholder="Enter volume"
              className={`border p-2 w-full rounded-lg ${
                errors?.options?.[index]?.volume
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {errors?.options?.[index]?.volume && (
              <span className="text-red-500">Volume is required</span>
            )}
          </div>

          {/* stock */}
          <div className="mb-3">
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              {...register(`options[${index}].stock`, { required: true })}
              placeholder="Enter stock"
              className={`border p-2 w-full rounded-lg ${
                errors?.options?.[index]?.stock
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {errors?.options?.[index]?.stock && (
              <span className="text-red-500">Stock is required</span>
            )}
          </div>

          {/* soldOut */}
          <div className="mb-3">
            <label className="block text-gray-700">Sold Out</label>
            <input
              type="checkbox"
              {...register(`options[${index}].soldOut`)}
              className="h-5 w-5"
            />
          </div>

          {/* dangerStock */}
          <div className="mb-3">
            <label className="block text-gray-700">Danger Stock</label>
            <input
              type="number"
              {...register(`options[${index}].dangerStock`, {
                required: true,
                valueAsNumber: true,
              })}
              placeholder="Enter danger stock"
              className={`border p-2 w-full rounded-lg ${
                errors?.options?.[index]?.dangerStock
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {errors?.options?.[index]?.dangerStock && (
              <span className="text-red-500">Danger stock is required</span>
            )}
          </div>

          {/* 옵션 제거 버튼 */}
          <button
            type="button"
            onClick={() => removeOption(index)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg"
          >
            Remove Option
          </button>
        </div>
      ))}

      {/* 옵션 추가 버튼 */}
      <button
        type="button"
        onClick={addOption}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        + Add Option
      </button>

      {/* 폼 제출 버튼 */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded-lg mt-4"
      >
        Submit Options
      </button>
    </form>
  );
};

export default ProductOptionForm;
