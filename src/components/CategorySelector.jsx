import React, { useState, useEffect } from 'react';
import { fetchCategories, submitProductCategories } from '../api/productApi'; // 분리된 로직 import

const CategorySelector = ({ productCode }) => {
  const [categories, setCategories] = useState({});
  const [selectedCategories, setSelectedCategories] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories('top');
  }, []);

  const loadCategories = async (parentCategoryCode) => {
    try {
      const newCategories = await fetchCategories(parentCategoryCode);
      setCategories((prev) => ({
        ...prev,
        [parentCategoryCode]: newCategories,
      }));
    } catch (error) {
      console.error('Failed to load categories', error);
    }
  };

  const handleCategoryChange = async (categoryCode, level) => {
    const levelKey =
      level === 0 ? 'top' : selectedCategories[level - 1]?.categoryCode;
    const selectedCategory = categories[levelKey]?.find(
      (category) => category.categoryCode === categoryCode
    );
    if (!selectedCategory) return;

    setSelectedCategories((prev) => {
      const newSelected = { ...prev };
      Object.keys(newSelected).forEach((key) => {
        if (parseInt(key) >= level) {
          delete newSelected[key];
        }
      });
      newSelected[level] = selectedCategory;
      return newSelected;
    });

    await loadCategories(categoryCode);
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await submitProductCategories(selectedCategories, productCode); // API 호출
    } catch (error) {
      alert('Failed to map product to categories.');
      console.error('Error submitting product categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const levels = [0, 1, 2, 3];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Category Selection
      </h2>
      <div className="space-y-4">
        {levels.map((level) => {
          const levelKey =
            level === 0 ? 'top' : selectedCategories[level - 1]?.categoryCode;
          const categoryOptions = categories[levelKey] || [];
          const parentSelected = level === 0 || selectedCategories[level - 1];

          return (
            <div
              key={level}
              className="flex flex-col sm:flex-row sm:items-center"
            >
              <label className="block text-sm font-medium text-gray-700 w-full sm:w-1/4 mb-2 sm:mb-0">
                {`Category Level ${level + 1}:`}
              </label>
              <div className="w-full sm:w-3/4">
                <select
                  onChange={(e) => handleCategoryChange(e.target.value, level)}
                  value={selectedCategories[level]?.categoryCode || ''}
                  disabled={!parentSelected}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map((category) => (
                    <option
                      key={category.categoryCode}
                      value={category.categoryCode}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white p-2 rounded-lg mt-4"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;
