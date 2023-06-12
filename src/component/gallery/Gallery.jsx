import React, { useState, useContext, useEffect, useCallback } from 'react';
import './gallery.css';
import { MyContext } from '../../data/ThemeProvider';
import { Link } from "react-router-dom";

function Gallery() {
  const { galleryHeight, galleryWidth, galleryHeightLow, galleryWidthLow, setImageKey } = useContext(MyContext);
  const [heightImages, setHeightImages] = useState([]);
  const [widthImages, setWidthImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [imagesPage, setImagesPage] = useState(1); // Declare a new state variable for current page

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
  console.log(":((((")
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

  const imagesPerPage = Math.max(heightImages.length, widthImages.length); // Define how many images per page based on the arrays' length
  const totalImages = heightImages.length + widthImages.length;
  const totalPages = Math.ceil(totalImages / imagesPerPage); // Calculate total pages

  const handlePageChange = (direction) => {
    setImagesPage(prevPage => {
      if (direction === 'right' && prevPage < totalPages) {
        return prevPage + 1;
      } else if (direction === 'left' && prevPage > 1) {
        return prevPage - 1;
      } else {
        return prevPage;
      }
    });
  };

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
        <img src="../../eventsup/left-arrow.png" alt="" onClick={() => handlePageChange('left')} />
        <div>{imagesPage}/{totalPages}</div>
        <img src="../../eventsup/right-arrow.png" alt="" onClick={() => handlePageChange('right')} />
      </div>
    </div>
  );
}

export default Gallery;
