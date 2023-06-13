import React, { useState, useContext, useEffect, useCallback } from 'react';
import './gallery.css';
import { MyContext } from '../../data/ThemeProvider';
import { Link } from "react-router-dom";

function Gallery() {
  const { galleryHeight, galleryWidth, setImageKey } = useContext(MyContext);
  const [heightImages, setHeightImages] = useState([]);
  const [widthImages, setWidthImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleResize = useCallback(() => {
    let newHeightImages, newWidthImages;
    if (window.innerWidth <= 700) {
      newHeightImages = [...galleryHeight].slice(0, 2);
      newWidthImages = [...galleryWidth].slice(0, 4);
    } else if (window.innerWidth <= 1200) {
      newHeightImages = [...galleryHeight].slice(0, 3);
      newWidthImages = [...galleryWidth].slice(0, 6);
    } else {
      newHeightImages = [...galleryHeight].slice(0, 5);
      newWidthImages = [...galleryWidth].slice(0, 10);
    }

    setHeightImages(newHeightImages);
    setWidthImages(newWidthImages);
    
    const sumGallery = newHeightImages.reduce((a, b) => a + b, 0) + newWidthImages.reduce((a, b) => a + b, 0);
    const sumImages = galleryHeight.reduce((a, b) => a + b, 0) + galleryWidth.reduce((a, b) => a + b, 0);

    setTotalPages(Math.ceil(sumGallery / sumImages));

  }, [galleryHeight, galleryWidth]);
  

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <div className="gallery--body">
      <img src="../../marblebackground2.jpg" alt="background" />
      <div className="gallery--title">
        <div>הטיולים שלנו</div>
      </div>
      <div className="gallery--container">
      {widthImages.map((img, index) => (
          <Link to="/fullGallery" className={`gallery--container--width${index + 1}`} onClick={() => setImageKey(img.key)}>
              <img src={img.src} alt="gallery" />
          </Link>
        ))}
        {heightImages.map((img, index) => (
          <Link to="/fullGallery" className={`gallery--container--height${index + 1}`} onClick={() => setImageKey(img.key)}>
              <img src={img.src} alt="gallery" />
          </Link>
        ))}
      </div>
      <div className='gallery--page'>
        <img src="../../eventsup/left-arrow.png" alt="" onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} />
        <div>{currentPage} / {totalPages}</div>
        <img src="../../eventsup/right-arrow.png" alt="" onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}/>        
      </div>
    </div>
  );
}

export default Gallery;
