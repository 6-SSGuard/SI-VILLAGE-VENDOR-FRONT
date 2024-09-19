import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ProductOptionForm = () => {
  const { register, handleSubmit } = useForm();
  const [options, setOptions] = useState([
    { productCode: '', sizeId: '', volume: '', stock: '' },
  ]);

  // 옵션 추가 핸들러
  const addOption = () => {
    setOptions([
      ...options,
      { productCode: '', sizeId: '', volume: '', stock: '' },
    ]);
  };

  // 옵션 제거 핸들러
  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  // 폼 제출 핸들러
  const onSubmit = (data) => {
    console.log('Submitted data:', data);
    // 제출 시 API 요청을 보내거나 데이터를 처리하는 로직 추가
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {options.map((option, index) => (
        <div key={index} className="border p-4 mb-4 rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Option {index + 1}</h3>

          {/* productCode */}
          <div className="mb-3">
            <label className="block text-gray-700">Product Code</label>
            <input
              type="text"
              {...register(`options[${index}].productCode`, { required: true })}
              placeholder="Enter product code"
              className="border p-2 w-full rounded-lg"
            />
          </div>

          {/* sizeId */}
          <div className="mb-3">
            <label className="block text-gray-700">Size ID</label>
            <input
              type="number"
              {...register(`options[${index}].sizeId`, { required: true })}
              placeholder="Enter size ID"
              className="border p-2 w-full rounded-lg"
            />
          </div>

          {/* volume */}
          <div className="mb-3">
            <label className="block text-gray-700">Volume</label>
            <input
              type="text"
              {...register(`options[${index}].volume`, { required: true })}
              placeholder="Enter volume"
              className="border p-2 w-full rounded-lg"
            />
          </div>

          {/* stock */}
          <div className="mb-3">
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              {...register(`options[${index}].stock`, { required: true })}
              placeholder="Enter stock"
              className="border p-2 w-full rounded-lg"
            />
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
        Submit
      </button>
    </form>
  );
};

export default ProductOptionForm;
