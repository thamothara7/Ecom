
const CART_STORAGE_KEY = 'ecom_cart';
const CART_EVENT = 'cart-updated';

export const getCart = () => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const getCartCount = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
};

export const addToCart = (product) => {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    let updatedCart;
    if (existingItem) {
        updatedCart = cart.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    } else {
        updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event(CART_EVENT));
    return updatedCart;
};

export const removeFromCart = (productId) => {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event(CART_EVENT));
    return updatedCart;
};

export const updateQuantity = (productId, change) => {
    const cart = getCart();
    const updatedCart = cart.map(item => {
        if (item.id === productId) {
            const newQuantity = Math.max(1, item.quantity + change);
            return { ...item, quantity: newQuantity };
        }
        return item;
    });
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event(CART_EVENT));
    return updatedCart;
};

export const clearCart = () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new Event(CART_EVENT));
};

export const subscribeToCart = (callback) => {
    window.addEventListener(CART_EVENT, callback);
    return () => window.removeEventListener(CART_EVENT, callback);
};
