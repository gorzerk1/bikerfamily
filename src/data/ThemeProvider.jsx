import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const MyContext = React.createContext();

function ThemeProvider({ children }) {
  const [imageKey, setImageKey] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://18.102.116.122:3000/api/images`);
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
    };

    fetchData();
  }, []);
  console.log(galleryHeight)
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
