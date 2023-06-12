import React, { useState, useContext, useEffect, useCallback } from 'react';
import './gallery.css';
import { MyContext } from '../../data/ThemeProvider';
import { Link } from "react-router-dom";

function Gallery() {
  const { galleryHeight, galleryWidth, galleryHeightLow, galleryWidthLow, setImageKey } = useContext(MyContext);
  const [heightImages, setHeightImages] = useState([]);
  const [widthImages, setWidthImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  
  const imagesPerPage = window.innerWidth <= 700 ? 2 * 4 :
                        window.innerWidth <= 1200 ? 3 * 6 :
                        5 * 10;

  const totalPages = Math.ceil((galleryHeightLow.length + galleryWidthLow.length) / imagesPerPage);
  console.log("now")
  useEffect(() => {
    const imagesStart = (currentPage - 1) * imagesPerPage;
    const imagesEnd = imagesStart + imagesPerPage;

    setHeightImages([...galleryHeightLow].slice(imagesStart, imagesEnd));
    setWidthImages([...galleryWidthLow].slice(imagesStart, imagesEnd));
  }, [currentPage, galleryHeightLow, galleryWidthLow]);

  const handleResize = useCallback(() => {
    setCurrentPage(1);  // reset to first page on resize
  }, []);
  
  const handlePageChange = (direction) => {
    if(direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if(direction === 'previous' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
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
      <div className='gallery--refresh'>
        <img src="../../eventsup/left-arrow.png" alt="" onClick={() => handlePageChange('previous')} />
        <div>{currentPage}/{totalPages}</div>
        <img src="../../eventsup/right-arrow.png" alt="" onClick={() => handlePageChange('next')} />
      </div>
    </div>
  );
}

export default Gallery;
