import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const MyContext = React.createContext();

function ThemeProvider({ children }) {
  const [imageKey, setImageKey] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState([]);
  const [backGroundVideos, setBackGroundVideo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.bikersil.com/api/images`);
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }

        const images = await response.json();

        // Check if the arrays have at least one item before slicing
        if (images.galleryWidth.length > 0) {
          const widthImages = images.galleryWidth
            .slice(1)
            .map(image => ({ ...image, key: uuidv4() }));
          setGalleryWidth(widthImages);
        }

        if (images.galleryHeight.length > 0) {
          const heightImages = images.galleryHeight
            .slice(1) 
            .map(image => ({ ...image, key: uuidv4() }));
          setGalleryHeight(heightImages);
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

        const videos = await response.json();
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
        galleryWidth
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, ThemeProvider };
