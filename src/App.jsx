import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PillNav from './PillNav';
import logo from './assets/logo.svg';
import './App.css';

const Page = ({ title, showTitle = true }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '3rem',
    fontFamily: 'Inter, sans-serif',
    color: '#333'
  }}>
    {showTitle && <h1>{title}</h1>}
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
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Services', href: '/services' },
          { label: 'About Us', href: '/about' }

        ]}
        activeHref={activeHref}
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />
      <Routes>
        <Route path="/" element={<Page title="Home" showTitle={false} />} />
        <Route path="/about" element={<Page title="About us" />} />
        <Route path="/services" element={<Page title="Services" />} />
        <Route path="/contact" element={<Page title="Contact" />} />
      </Routes>
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
