import React, { useState } from 'react';
import './eachImage.css';
import { GalleryHeight, GalleryWidth } from '../../data/GalleryData.jsx';

function EachImage() {
  const [allImages, setAllImages] = useState([...GalleryHeight, ...GalleryWidth]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
