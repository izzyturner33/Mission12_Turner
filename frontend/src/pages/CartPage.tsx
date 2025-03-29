// Import navigation hook to programmatically change pages
import { useNavigate } from 'react-router-dom';

// Import cart context to access cart state and actions
import { useCart } from '../context/CartContext';

// Import the CartItem type for type safety
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate(); // Used to navigate back to the projects page
  const { cart, removeFromCart } = useCart(); // Access cart items and remove function

  // Calculate total cart amount using reduce
  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div>
      <h2>Your Cart</h2>

      <div>
        {/* Show a message if cart is empty, otherwise display cart items */}
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {/* Loop through cart items and display each with a remove button */}
            {cart.map((item: CartItem) => (
              <li key={item.bookId}>
                {/* Display title, quantity, price, and total price */}
                {item.title}: {item.quantity} × ${item.price.toFixed(2)} = $
                {(item.quantity * item.price).toFixed(2)}
                {/* Remove button with icon and animation class */}
                <button
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 morph-remove"
                  onClick={() => removeFromCart(item.bookId)}
                >
                  <span className="remove-text">Remove</span>
                  <i className="bi bi-trash-fill"></i> {/* Bootstrap Icons */}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display total price for the cart */}
      <h3>Total: ${total.toFixed(2)}</h3>

      {/* Checkout and navigation buttons */}
      <button>Checkout</button>
      <button onClick={() => navigate('/projects')}>Continue Browsing</button>
    </div>
  );
}

// Export the CartPage component for use in routes
export default CartPage;
