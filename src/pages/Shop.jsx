import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import AddToCartButton from '../components/AddToCartButton';
import { getProducts } from '../utils/productStore';
import Footer from '../components/Footer';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const gridRef = useRef(null);

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    useEffect(() => {
        if (products.length > 0 && gridRef.current) {
            gsap.fromTo(gridRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
            );
        }
    }, [products]);

    return (
        <div className="page-wrapper">
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
                                <AddToCartButton product={product} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
