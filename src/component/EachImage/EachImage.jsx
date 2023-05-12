import React, { useState, useContext, useEffect } from 'react';
import './eachImage.css';
import { GalleryHeight, GalleryWidth } from '../../data/GalleryData.jsx';
import { MyContext } from '../../data/ThemeProvider';
import { Link } from "react-router-dom"

function EachImage() {
  const [allImages, setAllImages] = useState([...GalleryHeight, ...GalleryWidth]);
  const { imageIndex } = useContext(MyContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.max(0, Math.min(imageIndex, allImages.length - 1))
  );
  

  useEffect(() => {
    setCurrentImageIndex(Math.max(0, Math.min(imageIndex, allImages.length - 1)));
  }, [imageIndex]);
  

  const currentImage = allImages[currentImageIndex];

  const handleNext = () => {
    setCurrentImageIndex((prevImageIndex) => {
      return (prevImageIndex + 1) % allImages.length;
    });
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevImageIndex) => {
      return (prevImageIndex - 1 + allImages.length) % allImages.length;
    });
  };
  return (
    <div className="EachImage--body">
      <img src={currentImage.src} alt="" />
      <div className={`EachImage--amountImages`}>{`${currentImageIndex + 1} / ${allImages.length}`}</div>
      <Link to="/" className='EachImage--exitIcon' ><img src="../../eventsup/exit.png" alt="" /></Link>
      <div className='EachImage--container'>
        <div className='EachImage--arrow'>
          <img src="../../eventsup/left-arrow-blue.png" onClick={handlePrev} alt="" />
        </div>
        <div className='EachImage--MainPicture EachImage--download'>
          <img 
            src={currentImage.src} 
            alt="" 
            style={{ 
              width: `${currentImage.width}px`, 
              height: `${currentImage.height}px`
            }} 
          />
        </div>
        <div className='EachImage--arrow1'>
          <img src="../../eventsup/right-arrow-blue.png" onClick={handleNext} alt="" />
        </div>
      </div>
    </div>
  );
}

export default EachImage;
