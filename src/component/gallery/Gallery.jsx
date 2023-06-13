import React, { useContext } from 'react';
import './gallery.css';
import { MyContext } from '../../data/ThemeProvider';
import { Link } from "react-router-dom";

function Gallery() {
  const { galleryHeight, galleryWidth, setImageKey } = useContext(MyContext);




  return (
    <div className="gallery--body">
      <img src="../../marblebackground2.jpg" alt="background" />
      <div className="gallery--title">
        <div>הטיולים שלנו</div>
      </div>
      <div className="gallery--container">
      {galleryWidth.map((img, index) => (
          <Link to="/fullGallery" className={`gallery--container--width${index + 1}`} onClick={() => setImageKey(img.key)}>
              <img src={img.src} alt="gallery" />
          </Link>
        ))}
        {galleryHeight.map((img, index) => (
          <Link to="/fullGallery" className={`gallery--container--height${index + 1}`} onClick={() => setImageKey(img.key)}>
              <img src={img.src} alt="gallery" />
          </Link>
        ))}
      </div>
      <div className='gallery--page'>
        <img src="../../eventsup/left-arrow.png" alt="" />
        <div>1 / {}</div>
        <img src="../../eventsup/right-arrow.png" alt="" />        
      </div>
    </div>
  );
}

export default Gallery;
