import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import './eachImage.css';
import { MyContext } from '../../data/ThemeProvider';
import { Link } from "react-router-dom";

function EachImage() {
  const { galleryHeight, galleryWidth } = useContext(MyContext);
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isRotated, setIsRotated] = useState(false);
  
  useEffect(() => {
    setAllImages([...galleryHeight, ...galleryWidth]);
  }, [galleryHeight, galleryWidth]);

  const currentImage = allImages[currentImageIndex];
  const imageSizeClass = currentImage ? `EachImage--buttons--${currentImage.imageSize}` : '';

  useEffect(() => {
    if(imageSizeClass === "EachImage--buttons--height") {
      setIsRotated(false);
    }
  }, [imageSizeClass]);

  useLayoutEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

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

  function handleRotate(){
    setIsRotated(prevState => !prevState);
  };

  function calculateDimensions(size) {
    if (windowWidth < 570) {
      return size / 1.9;
    } else if (windowWidth < 1050) {
      return size / 1.5;
    } else {
      return size;
    }
  }
  
  return (
    <div className="EachImage--body">
      {currentImage && (
        <>
          <img src={currentImage.src}  alt="leonardoback" />
          <div className={`EachImage--amountImages`}>{`${currentImageIndex + 1} / ${allImages.length}`}</div>
          <Link to="/" className='EachImage--exitIcon'><img src="../../eventsup/exit.png" alt="lenardobyebye" /></Link>
          <div className='EachImage--container'>
            <div className='EachImage--arrow'>
              <img src="../../eventsup/left-arrow-blue.png" onClick={handlePrev} alt="leonardoleft" />
            </div>
            <div className={isRotated ? `EachImage--computersize--rotate` : `EachImage--computersize`}>
              <img 
                src={currentImage.src} 
                alt="leonardo"
                style={{ 
                  width: `${calculateDimensions(currentImage.width)}px`, 
                  height: `${calculateDimensions(currentImage.height)}px`,
                }} 
              />
              <div className={`${imageSizeClass} ${isRotated ? "EachImage--buttons--width__rotate" : ""}`}>
                <img src="../../download.png" alt="" />
                {windowWidth < 1050 && imageSizeClass === "EachImage--buttons--width" && <img src="../../rotate.png" alt="" onClick={handleRotate}/>}
              </div>
            </div>
            <div className='EachImage--arrow1'>
              <img src="../../eventsup/right-arrow-blue.png" onClick={handleNext} alt="leonardoright" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EachImage;
