// Import React state management
import { useState } from 'react';

// Import custom components
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function ProjectsPage() {
  // State to keep track of which book categories are selected via the checkboxes
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      {/* Fixed cart summary that shows total and links to cart */}
      <CartSummary />

      {/* Top banner/welcome section */}
      <WelcomeBand />

      {/* Bootstrap grid layout: sidebar + main content */}
      <div className="row">
        {/* Sidebar: Category filters */}
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>

        {/* Main content: Filtered and sorted book list */}
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

// Export the ProjectsPage so it can be used in routing
export default ProjectsPage;
