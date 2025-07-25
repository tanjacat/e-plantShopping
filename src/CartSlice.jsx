import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart', // The name of the slice, used in the Redux store state
    initialState: {
        items: [], // Initialize items as an empty array to store products in the cart
    },
    reducers: {
        /**
         * Adds a new item to the cart or increments the quantity of an existing item.
         * @param {Object} state - The current state of the cart slice.
         * @param {Object} action - The action object containing the payload (product details).
         * action.payload should be an object like { name: 'PlantName', image: 'url', cost: '$XX' }
         */
        addItem: (state, action) => {
            const { name, image, cost } = action.payload; // Destructure product details from the action payload

            // Check if the item already exists in the cart by comparing names
            const existingItem = state.items.find(item => item.name === name);

            if (existingItem) {
                // If the item already exists in the cart, increment its quantity
                existingItem.quantity++;
            } else {
                // If the item does not exist, add it to the cart with a quantity of 1
                state.items.push({ name, image, cost, quantity: 1 });
            }
        },

        /**
         * Removes an item from the cart based on its name.
         * @param {Object} state - The current state of the cart slice.
         * @param {Object} action - The action object, where action.payload is the name of the item to remove.
         */
        removeItem: (state, action) => {
            // Filter out the item whose name matches the payload (the name of the item to remove)
            state.items = state.items.filter(item => item.name !== action.payload);
        },

        /**
         * Updates the quantity of a specific item in the cart.
         * @param {Object} state - The current state of the cart slice.
         * @param {Object} action - The action object containing the payload with item name and new quantity.
         * action.payload should be an object like { name: 'PlantName', quantity: N }
         */
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload

            // Find the item in the cart that matches the given name
            const itemToUpdate = state.items.find(item => item.name === name);

            if (itemToUpdate) {
                // If the item is found, update its quantity to the new value
                // Ensure quantity is not negative
                itemToUpdate.quantity = Math.max(0, quantity); 
                // Optionally, if quantity becomes 0, you might want to remove the item:
                // if (itemToUpdate.quantity === 0) {
                //     state.items = state.items.filter(item => item.name !== name);
                // }
            }
        },
    },
});

// Export action creators to be used in components (e.g., ProductList.jsx, CartItem.jsx)
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as default to be combined in the Redux store (e.g., store.js)
export default CartSlice.reducer;