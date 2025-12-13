import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import Footer from '../components/Footer';

const Home = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
      .fromTo(btnRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-container home-page" ref={heroRef}>
        <div className="hero-split">
          <div className="hero-text-side">
            <h1 ref={titleRef} className="hero-title">
              Elevate Your <br /><span className="highlight">Everyday.</span>
            </h1>
            <p className="hero-subtitle">
              Discover a curated collection of premium essentials designed for the modern individual.
              Minimalist aesthetics meets maximum functionality.
            </p>
            <div ref={btnRef} className="hero-actions">
              <Link to="/shop" className="cta-button primary">
                Shop Now
              </Link>
              <Link to="/about" className="cta-button secondary">
                Our Story
              </Link>
            </div>
          </div>
          <div className="hero-image-side">
            <div className="hero-image-card">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80" alt="Lifestyle" />
            </div>
          </div>
        </div>
      </div>

      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Curated Collections</h2>
          <Link to="/shop" className="view-all-link">View All</Link>
        </div>
        <div className="category-grid">
          <div className="category-card large">
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" alt="Watches" className="category-bg" />
            <div className="category-content">
              <h3>Timepieces</h3>
              <Link to="/shop" className="text-link">Shop Watches</Link>
            </div>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80" alt="Sunglasses" className="category-bg" />
            <div className="category-content">
              <h3>Eyewear</h3>
              <Link to="/shop" className="text-link">Shop Sunglasses</Link>
            </div>
          </div>
          <div className="category-card">
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80" alt="Footwear" className="category-bg" />
            <div className="category-content">
              <h3>Footwear</h3>
              <Link to="/shop" className="text-link">Shop Shoes</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Join the Inner Circle</h2>
          <p>Get early access to drops and exclusive member-only pricing.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
