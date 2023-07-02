import { useState, useEffect } from 'react';
import './navbar.css';

function Navbar({ galleryRef, aboutUsRef, contactRef, mainRef }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  function handleResize() {
    if (window.innerWidth >= 630) {
      setMenuVisible(false);
    }
  }

  function handleScroll() {
    if (window.scrollY > 300) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function scrollTo(ref) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setMenuVisible(false); // Hide the menu after scrolling to the section
  }

  return (
    <div className={`navbar--body${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar--container" dir="rtl">
        <div className='navbar--text'>
          <div onClick={() => scrollTo(mainRef)}>בית</div>
          <div onClick={() => scrollTo(galleryRef)}>גלריה</div>
          <div onClick={() => scrollTo(aboutUsRef)}>אודותינו</div>
          <div onClick={() => scrollTo(contactRef)}>צור קשר</div>
        </div>
        <div className='navbar--logo'>
          <img src="../../bikerlogo.png" alt="" />
        </div>
      </div>
        <div className='navbar--image' onClick={() => setMenuVisible(!menuVisible)}>
        <img src="../../menu.png" alt="" />
      </div>
      <div className={`navbar--menu ${menuVisible ? 'show' : ''}`}>
          <div onClick={() => scrollTo(mainRef)}>בית</div>
          <div onClick={() => scrollTo(galleryRef)}>גלריה</div>
          <div onClick={() => scrollTo(aboutUsRef)}>אודותינו</div>
          <div onClick={() => scrollTo(contactRef)}>צור קשר</div>
      </div>
    </div>
  );
}

export default Navbar;
