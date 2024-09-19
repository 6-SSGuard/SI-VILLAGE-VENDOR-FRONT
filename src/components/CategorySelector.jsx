import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategorySelector = () => {
  const [categories, setCategories] = useState({});
  const [selectedCategories, setSelectedCategories] = useState({});

  useEffect(() => {
    fetchCategories('top');
  }, []);

  const fetchCategories = async (parentCategoryCode) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/category/sub-categories`,
        {
          params: { parentCategoryCode },
        }
      );
      const newCategories = response.data.result;
      console.log('Fetched categories:', newCategories);
      setCategories((prev) => ({
        ...prev,
        [parentCategoryCode]: newCategories,
      }));
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const handleCategoryChange = async (categoryCode, level) => {
    const levelKey =
      level === 0 ? 'top' : selectedCategories[level - 1]?.categoryCode;
    const selectedCategory = categories[levelKey]?.find(
      (category) => category.categoryCode === categoryCode
    );
    console.log('Selected category:', selectedCategory);
    if (!selectedCategory) return;

    setSelectedCategories((prev) => {
      const newSelected = { ...prev };
      // 현재 레벨 이후의 모든 선택된 카테고리를 삭제
      Object.keys(newSelected).forEach((key) => {
        if (parseInt(key) >= level) {
          delete newSelected[key];
        }
      });
      newSelected[level] = selectedCategory;
      return newSelected;
    });

    // 다음 단계 카테고리 로드
    await fetchCategories(categoryCode);
  };

  const levels = [0, 1, 2, 3];

  return (
    <div>
      {levels.map((level) => {
        const levelKey =
          level === 0 ? 'top' : selectedCategories[level - 1]?.categoryCode;
        const categoryOptions = categories[levelKey] || [];
        const parentSelected = level === 0 || selectedCategories[level - 1];

        return (
          <div key={level}>
            <label>
              {`Category Level ${level + 1}: `}
              <select
                onChange={(e) => handleCategoryChange(e.target.value, level)}
                value={selectedCategories[level]?.categoryCode || ''}
                disabled={!parentSelected}
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
            </label>
            {selectedCategories[level] && (
              <p>Selected Category: {selectedCategories[level].categoryName}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategorySelector;
