// Import global CSS styles
import './App.css';

// Import page components
import PurchasePage from './pages/PurchasePage';
import ProjectsPage from './pages/ProjectsPage';
import CartPage from './pages/CartPage';

// Import routing functionality from React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the cart context provider to manage global cart state
import { CartProvider } from './context/CartContext';
import AdminProjectsPage from './pages/AdminProjectsPage';

function App() {
  return (
    <>
      {/* Wrap the app in CartProvider to make cart state available globally */}
      <CartProvider>
        {/* Set up routing for the app */}
        <Router>
          <Routes>
            {/* Home and projects page route */}
            <Route path="/" element={<ProjectsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />

            {/* Route for the purchase page using dynamic book title, id, and price */}
            <Route
              path="/purchase/:title/:bookId/:price"
              element={<PurchasePage />}
            />

            {/* Route for viewing the shopping cart */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminProjectsPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

// Export the App component so it can be rendered by index.tsx
export default App;
