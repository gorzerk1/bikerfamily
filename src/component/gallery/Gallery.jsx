import React, { useState, useContext, useEffect, useCallback } from 'react';
import './gallery.css';
import { MyContext } from '../../data/ThemeProvider';
import { Link } from "react-router-dom";

function Gallery() {
  const { galleryHeight, galleryWidth, galleryHeightLow, galleryWidthLow, setImageKey } = useContext(MyContext);
  const [heightImages, setHeightImages] = useState([]);
  const [widthImages, setWidthImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});

  const handleResize = useCallback(() => {
    if (window.innerWidth <= 700) {
      setHeightImages([...galleryHeightLow].slice(0, 2));
      setWidthImages([...galleryWidthLow].slice(0, 4));
    } else if (window.innerWidth <= 1200) {
      setHeightImages([...galleryHeightLow].slice(0, 3));
      setWidthImages([...galleryWidthLow].slice(0, 6));
    } else {
      setHeightImages([...galleryHeightLow].slice(0, 5));
      setWidthImages([...galleryWidthLow].slice(0, 10));
    }
    // Added this to force a refresh of images on resize
    setLoadedImages({});
  }, [galleryHeightLow, galleryWidthLow]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const handleImageLoad = (key, src) => {
    setLoadedImages(prevState => ({
      ...prevState,
      [key]: src
    }));
  };

  useEffect(() => {
    heightImages.forEach((img, index) => {
      const imgObject = new Image();
      imgObject.src = galleryHeight[index].src;
      imgObject.onload = () => handleImageLoad(img.key, galleryHeight[index].src);
    });

    widthImages.forEach((img, index) => {
      const imgObject = new Image();
      imgObject.src = galleryWidth[index].src;
      imgObject.onload = () => handleImageLoad(img.key, galleryWidth[index].src);
    });
  }, [heightImages, widthImages, galleryHeight, galleryWidth, handleImageLoad]);

  return (
    <div className="gallery--body">
      <img src="../../marblebackground2.jpg" alt="" />
      <div className="gallery--title">
        <div>הטיולים שלנו</div>
      </div>
      <div className="gallery--container">
      {widthImages.map((img, index) => (
          <Link to="/fullGallery" className={`gallery--container--width${index + 1}`} onClick={() => setImageKey(img.key)}>
              <img 
                src={loadedImages[img.key] ? loadedImages[img.key] : img.src} 
                alt="" 
                loading="lazy" 
              />
          </Link>
        ))}
        {heightImages.map((img, index) => (
          <Link to="/fullGallery" className={`gallery--container--height${index + 1}`} onClick={() => setImageKey(img.key)}>
              <img 
                src={loadedImages[img.key] ? loadedImages[img.key] : img.src} 
                alt="" 
                loading="lazy" 
              />
          </Link>
        ))}
      </div>
      <div className='gallery--refresh' onClick={handleResize}>
        <img src="../../refresh.png" alt="" />
      </div>
    </div>
  );
}

export default Gallery;
