import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PillNav from './PillNav';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import logo from './assets/logo.svg';
import './App.css';

import Footer from './components/Footer';

const Page = ({ title }) => (
  <div className="page-wrapper">
    <div className="page-container about-page">
      <h1 className="section-title">{title}</h1>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, Luxe was born from a desire to bridge the gap between premium aesthetics and everyday functionality.
            We believe that style shouldn't come at the cost of comfort, and that luxury is a feeling, not just a price tag.
          </p>
          <p>
            Our team of designers and curators works tirelessly to bring you a selection of products that elevate your daily life.
          </p>
        </div>
      </section>

      <section className="philosophy-section">
        <div className="philosophy-content">
          <h2>Design Philosophy</h2>
          <p>
            "Less is more, but better is everything." We adhere to a strict code of minimalism where every detail serves a purpose.
            Our products are designed to be timeless, transcending fleeting trends to become staples in your life.
          </p>
        </div>
      </section>

      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Quality</h3>
            <p>We never compromise on the materials and craftsmanship of our products.</p>
          </div>
          <div className="value-card">
            <h3>Sustainability</h3>
            <p>We are committed to reducing our footprint and sourcing responsibly.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We constantly seek new ways to improve our designs and customer experience.</p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>We build more than just products; we build a community of like-minded individuals.</p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
);


const Content = () => {
  const location = useLocation();
  const [activeHref, setActiveHref] = useState(location.pathname);

  useEffect(() => {
    setActiveHref(location.pathname);
  }, [location]);

  return (
    <>
      <header className="site-header">
        <div className="header-logo">
          <img src={logo} alt="Luxe Logo" />
        </div>

        <PillNav
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' }
          ]}
          activeHref={activeHref}
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#ffffff"
          pillColor="#ffffff"
          hoveredPillTextColor="#000000"
          pillTextColor="#ffffff"
        />

        <div className="header-cart">
          <a href="/cart" className="cart-icon">
            Cart (0)
          </a>
        </div>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<Page title="About Us" />} />
          <Route path="/contact" element={<Page title="Contact Us" />} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

export default App;
