import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ProductImageUpload = () => {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState([]);
  const [thumbnailIndex, setThumbnailIndex] = useState(null); // 썸네일로 설정된 이미지 인덱스

  const onSubmit = (data) => {
    if (images.length === 0) {
      alert('Please upload at least one image.');
      return;
    }

    const requestData = images.map((image, index) => ({
      productCode: data.productCode, // 백엔드에서 자동 생성
      imageUrl: image.url,
      thumbnail: index === thumbnailIndex, // 썸네일 여부
    }));

    console.log('Final request data:', requestData);

    // API 호출 또는 데이터를 백엔드로 전송
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length + images.length > 10) {
      alert('You can only upload up to 10 images.');
      return;
    }

    const newImages = [...images];
    for (let i = 0; i < files.length; i++) {
      newImages.push({
        url: URL.createObjectURL(files[i]), // 이미지 URL
        file: files[i],
      });
    }
    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    if (index === thumbnailIndex) {
      setThumbnailIndex(null); // 삭제한 이미지가 썸네일일 경우, 썸네일 해제
    } else if (index < thumbnailIndex) {
      setThumbnailIndex(thumbnailIndex - 1); // 썸네일 인덱스 조정
    }
  };

  const setThumbnail = (index) => {
    setThumbnailIndex(index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload Product Images
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">
            Product Images (Max 10)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="border p-2 rounded-md"
          />
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  X
                </button>
                <button
                  type="button"
                  onClick={() => setThumbnail(index)}
                  className={`mt-2 block w-full text-center py-1 rounded-md ${
                    thumbnailIndex === index
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300'
                  }`}
                >
                  {thumbnailIndex === index ? 'Thumbnail' : 'Set as Thumbnail'}
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductImageUpload;
