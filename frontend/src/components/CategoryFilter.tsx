import { useEffect, useState } from 'react';
import './CategoryFilter.css';

// Component for displaying and managing category filters using checkboxes
function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  // Local state to store available categories fetched from the API
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch the list of categories from the backend API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:4001/api/Book/GetBookTypes',
        );
        const data = await response.json();

        console.log(`Fetched categories:`, data);
        setCategories(data); // Save fetched categories into state
      } catch (error) {
        console.error(`Error fetching categories`, error);
      }
    };

    fetchCategories();
  }, []);

  // Handle when a checkbox is clicked: add or remove it from selected categories
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value) // Uncheck: remove category
      : [...selectedCategories, target.value]; // Check: add category

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h5>Book Categories</h5>
      <div className="category-list">
        {/* Render each category as a checkbox */}
        {categories.map((c) => (
          <div key={c} className="category-item">
            <input
              type="checkbox"
              id={c}
              value={c}
              className="category-checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
