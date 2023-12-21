// Retrieve or create cart from local browser storage
const getOrCreateCart = () => {
    let cart = localStorage.getItem('cart');
    
    if (cart === null) {
        cart = {};
    }
    else {
        cart = JSON.parse(cart);
    }

    return cart
} 

// Add a quantity of the given product ID to cart
export const addToCart = (productId, quantity) => {
    let cart = getOrCreateCart()

    let oldQuantity = cart[productId];
    if (oldQuantity === undefined) {
        cart[productId] = quantity;
    }
    else {
        cart[productId] = oldQuantity + quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Remove a quantity or completely remove a given product ID from cart
export const removeFromCart = (productId, quantity) => {
    let cart = getOrCreateCart()

    let oldQuantity = cart[productId];
    if (oldQuantity !== undefined) {
        let newQuantity = oldQuantity - quantity;
        if (newQuantity <= 0) {
            delete cart[productId];
        }
        else {
            cart[productId] = newQuantity;
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Remove all items from cart
export const clearCart = () => {
    localStorage.removeItem('cart');
}
