import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { shuffle } from 'lodash';

const MyContext = React.createContext();

function ThemeProvider({ children }) {
  const [imageKey, setImageKey] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState([]);
  const [galleryHeightLow, setGalleryHeightLow] = useState([]);
  const [galleryWidthLow, setGalleryWidthLow] = useState([]);
  const [backGroundVideos, setBackGroundVideo] = useState([]);


  
  const shuffleImages = (images) => {
    return shuffle(images).map(image => ({ ...image, key: uuidv4() }));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseLow = await fetch(`https://api.bikersil.com/api/images/low`);
        const response = await fetch(`https://api.bikersil.com/api/images`);
        if (!response.ok || !responseLow.ok) {
          throw new Error('HTTP error ' + response.status);
        }

        const images = await response.json();
        const imagesLow = await responseLow.json();

        if (images.galleryWidth.length > 0) {
          const widthImages = shuffleImages(images.galleryWidth.slice(1));
          setGalleryWidth(widthImages);
        }

        if (images.galleryHeight.length > 0) {
          const heightImages = shuffleImages(images.galleryHeight.slice(1));
          setGalleryHeight(heightImages);
        }

        if (imagesLow.galleryWidthLow.length > 0) {
          const widthImagesLow = shuffleImages(imagesLow.galleryWidthLow.slice(1));
          setGalleryWidthLow(widthImagesLow);
          console.log(widthImagesLow); //Added console.log here
        }

        if (imagesLow.galleryHeightLow.length > 0) {
          const heightImagesLow = shuffleImages(imagesLow.galleryHeightLow.slice(1));
          setGalleryHeightLow(heightImagesLow);
        }
      } catch (error) {
        console.error('Error:', error);
        console.log('Error name:', error.name);
        console.log('Error message:', error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`https://api.bikersil.com/api/videos`);
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
  
        let videos = await response.json();
        
        if (videos.length > 0) {
          videos.shift();
        }
  
        setBackGroundVideo(videos);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchVideos();
  }, []);
  
  return (
      <MyContext.Provider
      value={{
        setImageKey,
        imageKey,
        galleryHeight,
        galleryWidth,
        galleryHeightLow,
        galleryWidthLow,
        backGroundVideos
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, ThemeProvider };
