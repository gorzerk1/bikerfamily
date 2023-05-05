import React, { useState, useEffect, useContext } from 'react';
import './eachImage.css';
import GalleryData from '../../data/GalleryData.jsx';
import { MyContext } from '../../data/ThemeProvider';

function EachImage() {
  const { imageIndex, setImageIndex } = useContext(MyContext);
  const [index, setIndex] = useState(imageIndex || 0);
  const [currentImage, setCurrentImage] = useState(GalleryData[0]?.src || '');

  useEffect(() => {
    setCurrentImage(GalleryData[index]?.src || '');
  }, [index]);

  function handleNext(){
    if (index < GalleryData.length - 1) {
      setIndex(index + 1);
    }
  };
  function handlePrev(){
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  
  
  return (
    <div className="EachImage--body">
      <img src={currentImage} alt="" />
      <div className='EachImage--amountImages'>{`${index + 1} / ${GalleryData.length}`}</div>
      <div className='EachImage--container'>
      <div className='EachImage--arrow'>
        <img src="../../eventsup/left-arrow.png" onClick={handlePrev} alt="" />
      </div>
      <div className='EachImage--MainPicture'>
        <img src={currentImage} alt="" />
        <img src="../../download.png" alt="" className='download'/>
      </div>
      <div className='EachImage--arrow1'>
        <img src="../../eventsup/right-arrow.png"  onClick={handleNext} alt="" />
      </div>
      </div>
    </div>
  );
}

export default EachImage;
