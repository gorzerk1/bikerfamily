import { useState, useEffect } from 'react';
import './navbar.css';

function Navbar({ galleryRef, aboutUsRef, contactRef }) {
  const [scrolled, setScrolled] = useState(false);

  function handleScroll() {
    if (window.scrollY > 300) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function scrollTo(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={`navbar--body${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar--container" dir="rtl">
        <div onClick={() => scrollTo(galleryRef)}>גלריה</div>
        <div onClick={() => scrollTo(aboutUsRef)}>אודותינו</div>
        <img src="../../bikerlogo.png" alt="" />
        <div>אירועים</div>
        <div onClick={() => scrollTo(contactRef)}>צור קשר</div>
      </div>
    </div>
  );
}


export default Navbar;
