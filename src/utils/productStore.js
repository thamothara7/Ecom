
const STORAGE_KEY = 'ecom_products_v2';

const initialProducts = [
    { id: 1, name: 'Minimalist Watch', price: '₹9,999', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Leather Bag', price: '₹19,999', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Wireless Headphones', price: '₹14,999', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Sunglasses', price: '₹6,999', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80' },
    { id: 5, name: 'Sneakers', price: '₹12,499', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
    { id: 6, name: 'Camera', price: '₹69,999', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80' },
];

export const getProducts = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
        return initialProducts;
    }
    return JSON.parse(stored);
};

export const addProduct = (product) => {
    const products = getProducts();
    const newProduct = { ...product, id: Date.now() }; // Simple ID generation
    const updatedProducts = [...products, newProduct];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    return updatedProducts;
};

export const deleteProduct = (productId) => {
    const products = getProducts();
    const updatedProducts = products.filter(p => p.id !== productId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    return updatedProducts;
};
