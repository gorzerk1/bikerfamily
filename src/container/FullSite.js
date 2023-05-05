import { useRef } from 'react';
import Main from '../component/main/Main.jsx'
import Navbar from '../component/navbar/Navbar.jsx'
import AboutUs from '../component/aboutUs/AboutUs.jsx'
import Gallery from '../component/gallery/Gallery.jsx'
import Contact from '../component/contact/Contact.jsx'
import Footer from '../component/footer/Footer.jsx'

function FullSite() {
  const galleryRef = useRef();
  const aboutUsRef = useRef();
  const contactRef = useRef();
  return (
    <>
      <Navbar galleryRef={galleryRef} aboutUsRef={aboutUsRef} contactRef={contactRef} />
      <Main />
      <div ref={galleryRef}>
        <Gallery />
      </div>
      <div ref={aboutUsRef}>
        <AboutUs />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
      <Footer />
    </>
  );
}


export default FullSite;
