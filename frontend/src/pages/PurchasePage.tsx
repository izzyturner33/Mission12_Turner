// React Router hooks for navigation and grabbing URL parameters
import { useNavigate, useParams } from 'react-router-dom';

// Custom components and context
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';

// React state hook
import { useState } from 'react';

// Type definition for cart items
import { CartItem } from '../types/CartItem';

function PurchasePage() {
  const navigate = useNavigate(); // Used to redirect the user (e.g., to the cart page)
  const { title, bookId, price } = useParams(); // Get dynamic URL parameters

  const { addToCart } = useCart(); // Access the cart context to add items

  // Local state to track the quantity selected by the user (as a string for input control)
  const [quantity, setQuantity] = useState<string>('1');

  // Handle adding the book to the cart
  const handleAddToCart = () => {
    const parsedQuantity = Number(quantity); // Convert quantity to number

    // Input validation: ensure quantity is a valid number >= 1
    if (!quantity || isNaN(parsedQuantity) || parsedQuantity < 1) {
      alert('Please enter a valid quantity (1 or more)');
      return;
    }

    // Create a new cart item using values from the URL and input
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Book Found',
      price: Number(price),
      quantity: parsedQuantity,
    };

    addToCart(newItem); // Add item to the global cart
    navigate('/cart'); // Redirect user to the cart page
  };

  return (
    <>
      {/* Welcome banner at the top */}
      <WelcomeBand />

      {/* Page title using book name from URL */}
      <h2>Add "{title}" to Cart</h2>

      {/* Input and add-to-cart button */}
      <div>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)} // Update state as user types
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      {/* Navigation back to book list */}
      <button onClick={() => navigate('/projects')}>Go Back</button>
    </>
  );
}

export default PurchasePage; // Export component for use in routing
