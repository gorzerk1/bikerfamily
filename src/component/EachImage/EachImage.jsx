import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import './eachImage.css';
import { GalleryHeight, GalleryWidth } from '../../data/GalleryData.jsx';
import { MyContext } from '../../data/ThemeProvider';
import { Link } from "react-router-dom"

function EachImage() {
  const [allImages] = useState([...GalleryHeight, ...GalleryWidth]);
  const { imageIndex } = useContext(MyContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.max(0, Math.min(imageIndex, allImages.length - 1))
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setCurrentImageIndex(Math.max(0, Math.min(imageIndex, allImages.length - 1)));
  }, [imageIndex, allImages.length]);
  

  useLayoutEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const currentImage = allImages[currentImageIndex];

  function handleNext(){
    setCurrentImageIndex((prevImageIndex) => {
      return (prevImageIndex + 1) % allImages.length;
    });
  };

  function handlePrev(){
    setCurrentImageIndex((prevImageIndex) => {
      return (prevImageIndex - 1 + allImages.length) % allImages.length;
    });
  };

  return (
    <div className="EachImage--body">
      <img src={currentImage.src} style={windowWidth >= 450 ? {opacity : 0.4} : {opacity : 1}} alt="leonardo" />
      <div className={`EachImage--amountImages`}>{`${currentImageIndex + 1} / ${allImages.length}`}</div>
      <Link to="/" className='EachImage--exitIcon' ><img src="../../eventsup/exit.png" alt="Exit button" /></Link>
      <div className='EachImage--container'>
        <div className='EachImage--arrow'>
          <img src="../../eventsup/left-arrow-blue.png" onClick={handlePrev} alt="Previous image" />
        </div>
        <div className='EachImage--computersize'>
        {windowWidth >= 450 &&
          <img 
            src={currentImage.src} 
            alt="leonardo"
            style={{ 
              width: `${currentImage.width}px`, 
              height: `${currentImage.height}px`
            }} 
          />
        }
        </div>
        <div className='EachImage--arrow1'>
          <img src="../../eventsup/right-arrow-blue.png" onClick={handleNext} alt="Next image" />
        </div>
      </div>
    </div>
  );
}

export default EachImage;
