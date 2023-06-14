import React, { useState, useContext, useEffect, useCallback } from 'react';
import './gallery.css';
import { MyContext } from '../../data/ThemeProvider';
import { Link } from "react-router-dom";

function Gallery() {
  const { galleryHeight, galleryWidth, setImageKey, imagesLoaded } = useContext(MyContext);
  const [heightImages, setHeightImages] = useState([]);
  const [widthImages, setWidthImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState({height: 5, width: 10});

  const calculateTotalPages = useCallback(() => {
    const totalHeightImages = Math.floor(galleryHeight.length / perPage.height);
    const totalWidthImages = Math.floor(galleryWidth.length / perPage.width);
    const totalPages = totalHeightImages < totalWidthImages ? totalHeightImages : totalWidthImages;
    setTotalPages(totalPages > 0 ? totalPages : 1);  // Ensure at least 1 page
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

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1 && totalPages >= 1) {
      setCurrentPage(1);  // Ensure currentPage never goes below 1
    }
  }, [currentPage, totalPages]);


  return (
    <div className="gallery--body">
      <img src="../../marblebackground2.jpg" alt="background" />
      <div className="gallery--title">
        <div>הטיולים שלנו</div>
      </div>

      {imagesLoaded ? (
        <div className="gallery--container">
          {widthImages.map((img, index) => (
            <Link to="/fullGallery" className={`gallery--container--width${index + 1}`} onClick={() => setImageKey(img.key)}>
                <img src={img.srcLow} alt="" onLoad={(e) => { e.target.src = img.src; }} />
            </Link>
          ))}
          {heightImages.map((img, index) => (
            <Link to="/fullGallery" className={`gallery--container--height${index + 1}`} onClick={() => setImageKey(img.key)}>
                <img src={img.srcLow} alt="" onLoad={(e) => { e.target.src = img.src; }} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="gallery--loading">
          <img src='../../loading.gif' alt='' />
        </div>
      )}
      
      <div className='gallery--page'>
        <img src="../../eventsup/left-arrow.png" alt="" onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} />
        <div>{currentPage} / {totalPages}</div>
        <img src="../../eventsup/right-arrow.png" alt="" onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}/>        
      </div>
    </div>
  );
}

export default Gallery;
