import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleSectionNavigation = (path, sectionId) => (e) => {
    // If already on homepage, scroll to section
    if (location.pathname === '/') {
      e.preventDefault();
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without reload
        window.history.pushState(null, '', `/#${sectionId}`);
      }
    }
  };
  if (location.pathname === '/login') {
    return null;
  }
  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <Link to="/" onClick={handleHomeClick}>Heptiscare</Link>
      </div>
      {}
      <div 
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      
      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" onClick={handleHomeClick}>Home</Link>
        </li>
        <li>
          <Link 
            to="/tentang" 
            onClick={handleSectionNavigation('/tentang', 'tentang')}
          >
            Tentang
          </Link>
        </li>
        <li>
          <Link 
            to="/risk-factors" 
            onClick={handleSectionNavigation('/risk-factors', 'faktor')}
          >
            Faktor Risiko
          </Link>
        </li>
        <li>
          <Link 
            to="/articles" 
            onClick={handleSectionNavigation('/articles', 'artikel')}
          >
            Artikel
          </Link>
        </li>
        <li>
          <Link 
            to="/prediction" 
            onClick={handleSectionNavigation('/prediction', 'prediksi')}
          >
            Prediksi
          </Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            onClick={handleSectionNavigation('/contact', 'contact')}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;