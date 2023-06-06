import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const MyContext = React.createContext();

function ThemeProvider({ children }) {
  const [imageKey, setImageKey] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.bikersil.com/api/images`);
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }

        const images = await response.json();

        // Ensure there are more than 1 image in the array, then slice from the 2nd index
        const widthImages = images.galleryWidth.length > 1 
          ? images.galleryWidth.slice(1).map(image => ({ ...image, key: uuidv4() })) 
          : [];

        const heightImages = images.galleryHeight.length > 1 
          ? images.galleryHeight.slice(1).map(image => ({ ...image, key: uuidv4() })) 
          : [];

        setGalleryWidth(widthImages);
        setGalleryHeight(heightImages);
      } catch (error) {
        console.error('Error:', error);
        console.log('Error name:', error.name);
        console.log('Error message:', error.message);
      }
    };

    fetchData();
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
