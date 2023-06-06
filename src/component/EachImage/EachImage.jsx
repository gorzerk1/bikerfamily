import React, { useState, useContext, useEffect, useLayoutEffect } from 'react';
import './eachImage.css';
import { MyContext } from '../../data/ThemeProvider';
import { Link } from "react-router-dom";

function EachImage() {
  const { imageKey, setImageKey, galleryHeight, galleryWidth } = useContext(MyContext);
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isRotated, setIsRotated] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // Additional state for button disable status
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setAllImages([...galleryHeight, ...galleryWidth]);
  }, [galleryHeight, galleryWidth]);

  useEffect(() => {
    if (imageKey !== null) {
      const matchingImage = allImages.find((img) => img.key === imageKey);
      if (matchingImage) {
        setCurrentImage(matchingImage);
        setCurrentImageIndex(allImages.indexOf(matchingImage));
      }
    } else {
      setCurrentImage(allImages[currentImageIndex]);
    }
  }, [allImages, currentImageIndex, imageKey]);
  

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

  // Function to handle delay
  const handleDelay = async (callback) => {
    setIsButtonDisabled(true); // disable button
    callback(); // call handleNext or handlePrev
    await new Promise(resolve => setTimeout(resolve, 1000)); // sleep for 1 second
    setIsButtonDisabled(false); // enable button
  }

  function handleNext(){
    handleDelay(() => {
      setCurrentImageIndex((prevImageIndex) => {
        return (prevImageIndex + 1) % allImages.length;
      });
      setImageKey(null);
    });
  };

  function handlePrev(){
    handleDelay(() => {
      setCurrentImageIndex((prevImageIndex) => {
        return (prevImageIndex - 1 + allImages.length) % allImages.length;
      });
      setImageKey(null);
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

  function downloadImage() {
    const link = document.createElement('a');
    link.href = currentImage.src;
    link.download = '';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); 
}

  
  return (
    <div className="EachImage--body">
      {currentImage && (
        <>
          <img src={currentImage.src}  alt="" />
          <div className="EachImage--amountImages">{`${currentImageIndex + 1} / ${allImages.length}`}</div>
          <Link to="/" className='EachImage--exitIcon'><img src="../../eventsup/exit.png" alt="" /></Link>
          <div className='EachImage--container'>
            <div className='EachImage--arrow'>
              <img src="../../eventsup/left-arrow-blue.png" onClick={!isButtonDisabled ? handlePrev : undefined} alt="" />
            </div>
            <div className={isRotated ? `EachImage--computersize--rotate` : `EachImage--computersize`}>
              <img 
                id="currentImage"
                src={currentImage.src} 
                alt=""
                style={{ 
                  width: `${calculateDimensions(currentImage.width)}px`, 
                  height: `${calculateDimensions(currentImage.height)}px`,
                }} 
              />
              <div className={`${imageSizeClass} ${isRotated ? "EachImage--buttons--width__rotate" : ""}`}>
              <img src="../../download.png" alt="" onClick={downloadImage} />
                {windowWidth < 1050 && imageSizeClass === "EachImage--buttons--width" && <img src="../../rotate.png" alt="" onClick={handleRotate}/>}
              </div>
            </div>
            <div className='EachImage--arrow1'>
              <img src="../../eventsup/right-arrow-blue.png" onClick={!isButtonDisabled ? handleNext : undefined} alt="l" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EachImage;
