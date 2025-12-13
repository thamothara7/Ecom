import { Link } from 'react-router-dom';

const Cart = () => {
    return (
        <div className="page-container cart-page">
            <h2 className="section-title">Your Cart</h2>
            <div className="cart-empty-state">
                <p>Your cart is currently empty.</p>
                <Link to="/shop" className="cta-button small">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default Cart;
