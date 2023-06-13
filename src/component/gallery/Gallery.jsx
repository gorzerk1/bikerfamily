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
  const [perPage, setPerPage] = useState({height: 5, width: 10});

  const calculateTotalPages = useCallback(() => {
    const totalImages = galleryHeight.length + galleryWidth.length;
    setTotalPages(Math.ceil(totalImages / (perPage.height + perPage.width)));
  }, [galleryHeight.length, galleryWidth.length, perPage.height, perPage.width]);

  useEffect(() => {
    if (window.innerWidth <= 700) {
      setPerPage({height: 2, width: 4});
    } else if (window.innerWidth <= 1200) {
      setPerPage({height: 3, width: 6});
    } else {
      setPerPage({height: 5, width: 10});
    }
    calculateTotalPages();
  }, [galleryHeight.length, galleryWidth.length, calculateTotalPages]);

  const handleResize = useCallback(() => {
    const startIndexHeight = perPage.height * (currentPage - 1);
    const startIndexWidth = perPage.width * (currentPage - 1);

    setHeightImages([...galleryHeight].slice(startIndexHeight, startIndexHeight + perPage.height));
    setWidthImages([...galleryWidth].slice(startIndexWidth, startIndexWidth + perPage.width));
  }, [currentPage, galleryHeight, galleryWidth, perPage.height, perPage.width]);

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
