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
  const [isRotated, setIsRotated] = useState(false);


  useEffect(() => {
    setCurrentImageIndex(Math.max(0, Math.min(imageIndex, allImages.length - 1)));
  }, [imageIndex, allImages.length]);

  useLayoutEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const currentImage = allImages[currentImageIndex];
  const imageSizeClass = `EachImage--buttons--${currentImage.imageSize}`;

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
  
  console.log(imageSizeClass)
  return (
    <div className="EachImage--body">
      <img src={currentImage.src}  alt="leonardoback" />
      <div className={`EachImage--amountImages`}>{`${currentImageIndex + 1} / ${allImages.length}`}</div>
      <Link to="/" className='EachImage--exitIcon' ><img src="../../eventsup/exit.png" alt="lenardobyebye" /></Link>
      <div className='EachImage--container'>
        <div className='EachImage--arrow'>
          <img src="../../eventsup/left-arrow-blue.png" onClick={handlePrev} alt="leonardoleft" />
        </div>
        <div className={`EachImage--computersize`}  >
        <img 
          src={currentImage.src} 
          alt="leonardo"
          style={{ 
            width: `${windowWidth < 1050 ? currentImage.width / 1.5 : currentImage.width}px`, 
            height: `${windowWidth < 1050 ? currentImage.height / 1.5 : currentImage.height}px`,
            
          }} 
        />
        <div className={`${imageSizeClass} `}  >
          <img src="../../download.png" alt="" />
          {imageSizeClass == "EachImage--buttons--width" && <img src="../../rotate.png" alt="" onClick={handleRotate}/>}
        </div>
        </div>
        <div className='EachImage--arrow1'>
          <img src="../../eventsup/right-arrow-blue.png" onClick={handleNext} alt="leonardoright" />
        </div>
      </div>
    </div>
  );
}

export default EachImage;
