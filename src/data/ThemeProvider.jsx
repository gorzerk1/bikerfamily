import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const MyContext = React.createContext();

function ThemeProvider({ children }) {
  const [imageKey, setImageKey] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState([]);
  console.log(galleryHeight)
  console.log(galleryWidth)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Changed the IP address to your new subdomain
        const response = await fetch(`https://api.bikersil.com/api/images`);
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }

        const images = await response.json();

        const widthImages = images
          .filter(image => image.imageSize === 'width')
          .map(image => ({ ...image, key: uuidv4() }));

        const heightImages = images
          .filter(image => image.imageSize === 'height')
          .map(image => ({ ...image, key: uuidv4() }));

        setGalleryWidth(widthImages.slice(1));
        setGalleryHeight(heightImages.slice(1));
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
