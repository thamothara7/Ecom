import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct, getProducts, deleteProduct } from '../utils/productStore';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        setProducts(getProducts());
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({ ...newProduct, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price || !newProduct.image) return;

        // Ensure price has currency symbol if missing
        let formattedPrice = newProduct.price;
        if (!formattedPrice.startsWith('₹') && !formattedPrice.startsWith('$')) {
            formattedPrice = `₹${formattedPrice}`;
        }

        addProduct({ ...newProduct, price: formattedPrice });
        setMessage('Product added successfully!');
        setNewProduct({ name: '', price: '', image: '' });
        loadProducts();

        setTimeout(() => setMessage(''), 3000);
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(productId);
            setMessage('Product deleted successfully!');
            loadProducts();
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        marginBottom: '1rem',
        borderRadius: '8px',
        border: '1px solid #333',
        background: '#0a0a0a',
        color: 'white',
        boxSizing: 'border-box',
        fontSize: '14px'
    };

    const cardStyle = {
        background: '#1a1a1a',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)'
    };

    return (
        <div className="page-container">
            <h1 className="section-title">Admin Dashboard</h1>

            <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
                {/* Add Product Form */}
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ margin: 0 }}>Add New Product</h2>
                        <button onClick={handleLogout} className="cta-button secondary" style={{ padding: '8px 20px', fontSize: '0.85rem', margin: 0 }}>
                            Logout
                        </button>
                    </div>

                    {message && <p style={{ color: '#4caf50', marginBottom: '1rem', padding: '10px', background: 'rgba(76, 175, 80, 0.1)', borderRadius: '6px' }}>{message}</p>}

                    <form onSubmit={handleAddProduct}>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            style={inputStyle}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Price (e.g., 9999 or ₹9,999)"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            style={inputStyle}
                            required
                        />

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#ccc' }}>Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{
                                    ...inputStyle,
                                    padding: '8px',
                                    marginBottom: 0
                                }}
                                required
                            />
                            {newProduct.image && (
                                <div style={{ marginTop: '1rem' }}>
                                    <img src={newProduct.image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                                </div>
                            )}
                        </div>

                        <button type="submit" className="cta-button primary" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
                            Add Product
                        </button>
                    </form>
                </div>

                {/* Product List */}
                <div style={cardStyle}>
                    <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Current Products ({products.length})</h2>
                    <div style={{ display: 'grid', gap: '1rem', maxHeight: '600px', overflowY: 'auto', padding: '0.5rem' }}>
                        {products.length === 0 ? (
                            <p style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>No products available</p>
                        ) : (
                            products.map(product => (
                                <div key={product.id} style={{
                                    display: 'grid',
                                    gridTemplateColumns: '80px 1fr auto',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: 'rgba(0,0,0,0.3)',
                                    borderRadius: '8px',
                                    alignItems: 'center',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    transition: 'all 0.2s ease'
                                }}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            objectFit: 'cover',
                                            borderRadius: '6px'
                                        }}
                                    />
                                    <div>
                                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{product.name}</h3>
                                        <p style={{ margin: 0, color: '#d4af37', fontWeight: '600' }}>{product.price}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'transparent',
                                            border: '1px solid #ff4444',
                                            color: '#ff4444',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            fontSize: '0.85rem'
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.background = '#ff4444';
                                            e.target.style.color = 'white';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.background = 'transparent';
                                            e.target.style.color = '#ff4444';
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
