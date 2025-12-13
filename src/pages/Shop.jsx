import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import AddToCartButton from '../components/AddToCartButton';

const products = [
    { id: 1, name: 'Minimalist Watch', price: '$129', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Leather Bag', price: '$249', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Wireless Headphones', price: '$199', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Sunglasses', price: '$89', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80' },
    { id: 5, name: 'Sneakers', price: '$159', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
    { id: 6, name: 'Camera', price: '$899', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80' },
];

const Shop = () => {
    const gridRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(gridRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
        );
    }, []);

    return (
        <div className="page-container shop-page">
            <h2 className="section-title">Latest Arrivals</h2>
            <div className="product-grid" ref={gridRef}>
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-image-wrapper">
                            <img src={product.image} alt={product.name} className="product-image" />
                        </div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>{product.price}</p>
                            <AddToCartButton />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;
