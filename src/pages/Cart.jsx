import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeFromCart, updateQuantity, subscribeToCart } from '../utils/cartStore';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const updateCart = () => {
        const items = getCart();
        setCartItems(items);

        const sum = items.reduce((acc, item) => {
            // Parse price string like "₹9,999" to number
            // Remove '₹' and ',' then parse
            const price = parseFloat(item.price.replace(/[₹,]/g, ''));
            return acc + (price * item.quantity);
        }, 0);
        setTotal(sum);
    };

    useEffect(() => {
        updateCart();
        const unsubscribe = subscribeToCart(updateCart);
        return () => unsubscribe();
    }, []);

    if (cartItems.length === 0) {
        return (
            <div className="page-container cart-page">
                <h2 className="section-title">Your Cart</h2>
                <div className="cart-empty-state">
                    <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '2rem' }}>Your cart is currently empty.</p>
                    <Link to="/shop" className="cta-button primary">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container cart-page">
            <h2 className="section-title">Your Cart</h2>

            <div className="cart-content" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item" style={{
                            display: 'flex',
                            gap: '1.5rem',
                            padding: '1.5rem 0',
                            borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />

                            <div className="item-details" style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.name}</h3>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{ background: 'transparent', border: 'none', color: '#666', cursor: 'pointer', padding: '0 5px' }}
                                        aria-label="Remove item"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <p style={{ color: '#d4af37', fontWeight: '600', margin: '0 0 1rem 0' }}>{item.price}</p>

                                <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        border: '1px solid #333',
                                        borderRadius: '20px',
                                        padding: '4px 12px'
                                    }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                                        >−</button>
                                        <span style={{ margin: '0 12px', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary" style={{
                    background: '#1a1a1a',
                    padding: '2rem',
                    borderRadius: '12px',
                    height: 'max-content',
                    position: 'sticky',
                    top: '100px'
                }}>
                    <h3 style={{ marginTop: 0 }}>Order Summary</h3>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#ccc' }}>
                        <span>Subtotal</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#ccc' }}>
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '1rem 0', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>

                    <button className="cta-button primary" style={{ width: '100%', marginTop: '1rem', border: 'none', cursor: 'pointer' }}>
                        Checkout
                    </button>

                    <Link to="/shop" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>
                        Continue Shopping
                    </Link>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .cart-content {
                        grid-template-columns: 1fr !important;
                        gap: 2rem !important;
                    }
                    .cart-summary {
                        position: static !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Cart;
