// Import React Router hook for navigation
import { useNavigate } from 'react-router-dom';

// Import cart context to access current cart state
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate(); // Hook to navigate to the cart page
  const { cart } = useCart(); // Get the current items in the cart

  // Calculate total amount in the cart
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    // Floating cart summary badge styled with inline CSS
    <div
      style={{
        position: 'fixed', // Stays in the same place as you scroll
        top: '10px', // Distance from the top of the screen
        right: '20px', // Distance from the right edge
        background: '#f8f9fa', // Light gray background
        padding: '10px 15px', // Padding inside the box
        borderRadius: '8px', // Rounded corners
        cursor: 'pointer', // Pointer cursor on hover
        display: 'flex', // Layout contents in a row
        alignItems: 'center', // Vertically center items
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)', // Soft drop shadow
        fontSize: '16px', // Font size for the text
      }}
      onClick={() => navigate('/cart')} // Clicking takes user to cart page
    >
      🛒 <strong>${totalAmount.toFixed(2)}</strong> {/* Display cart total */}
    </div>
  );
};

export default CartSummary; // Export component to use in layout
