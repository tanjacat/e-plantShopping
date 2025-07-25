import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Ensure this path is correct
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    // Select the 'items' array from the 'cart' slice of the Redux store
    const cart = useSelector(state => state.cart.items);
    // Get the dispatch function to send actions to the Redux store
    const dispatch = useDispatch();

    /**
     * Calculates the total monetary amount for all products currently in the cart.
     * Iterates through the cart items, parses their cost, multiplies by quantity, and sums them up.
     * @returns {number} The total amount of all items in the cart.
     */
    const calculateTotalAmount = () => {
        // Initialize total accumulator
        let total = 0;
        // Iterate over each item in the cart
        cart.forEach(item => {
            // Extract the numeric part of the cost string (e.g., "$15" -> "15")
            const costValue = parseFloat(item.cost.substring(1));
            // Add the item's total cost (quantity * unit cost) to the cumulative total
            total += costValue * item.quantity;
        });
        // Return the formatted total, rounded to two decimal places
        return total.toFixed(2);
    };

    /**
     * Handles the "Continue Shopping" button click.
     * Calls the `onContinueShopping` function passed as a prop from the parent component,
     * allowing the user to return to the product list.
     * @param {Event} e - The synthetic event object.
     */
    const handleContinueShopping = (e) => {
        e.preventDefault(); // Prevent default form submission or link navigation
        onContinueShopping(); // Call the parent function to switch views
    };

    /**
     * Handles the "Checkout" button click.
     * Currently displays an alert indicating that functionality will be added later.
     * @param {Event} e - The synthetic event object.
     */
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    /**
     * Increments the quantity of a specific item in the cart.
     * Dispatches the `updateQuantity` action to the Redux store.
     * @param {Object} item - The item object whose quantity needs to be incremented.
     */
    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    /**
     * Decrements the quantity of a specific item in the cart.
     * If the quantity becomes 0 after decrementing, the item is removed from the cart.
     * Dispatches `updateQuantity` or `removeItem` action to the Redux store.
     * @param {Object} item - The item object whose quantity needs to be decremented.
     */
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            // If quantity is greater than 1, just decrement it
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            // If quantity is 1 and decremented, remove the item completely
            dispatch(removeItem(item.name));
        }
    };

    /**
     * Removes a specific item completely from the cart.
     * Dispatches the `removeItem` action to the Redux store.
     * @param {Object} item - The item object to be removed from the cart.
     */
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    /**
     * Calculates the total cost for a single item type in the cart.
     * Multiplies the item's quantity by its unit price.
     * @param {Object} item - The item object for which to calculate the total cost.
     * @returns {number} The total cost for the specific item type, formatted to two decimal places.
     */
    const calculateTotalCost = (item) => {
        // Extract the numeric part of the cost string and parse it as a float
        const costValue = parseFloat(item.cost.substring(1));
        // Calculate total cost for the item (quantity * unit cost)
        return (item.quantity * costValue).toFixed(2);
    };

    // --- Start of HTML structure for CartItem component ---
    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div className="cart-items-list"> {/* Added a wrapper div for consistent styling */}
                {cart.length === 0 ? (
                    <p className="empty-cart-message">Your cart is empty.</p>
                ) : (
                    cart.map(item => (
                        <div className="cart-item" key={item.name}>
                            <img className="cart-item-image" src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                                <div className="cart-item-name">{item.name}</div>
                                <div className="cart-item-cost">{item.cost}</div>
                                <div className="cart-item-quantity">
                                    <button
                                        className="cart-item-button cart-item-button-dec"
                                        onClick={() => handleDecrement(item)}
                                        aria-label={`Decrease quantity of ${item.name}`} // Accessibility improvement
                                    >
                                        -
                                    </button>
                                    <span className="cart-item-quantity-value">{item.quantity}</span>
                                    <button
                                        className="cart-item-button cart-item-button-inc"
                                        onClick={() => handleIncrement(item)}
                                        aria-label={`Increase quantity of ${item.name}`} // Accessibility improvement
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                                <button
                                    className="cart-item-delete"
                                    onClick={() => handleRemove(item)}
                                    aria-label={`Remove ${item.name} from cart`} // Accessibility improvement
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {/* The total amount is already displayed above, so this div can be removed or used for other purposes */}
            {/* <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div> */}

            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button> {/* Added onClick */}
            </div>
        </div>
    );
};

export default CartItem;
