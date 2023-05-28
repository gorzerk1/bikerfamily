import React, { useState, useEffect } from 'react';

const MyContext = React.createContext();

function ThemeProvider({ children }) {
  const [imageKey, setImageKey] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Send HTTP GET request to server endpoint
      const response = await fetch(`http://15.160.205.150:3000/api/images`);
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      // Parse JSON response
      const images = await response.json();
      const widthImages = images.filter(image => image.imageSize === 'width');
      const heightImages = images.filter(image => image.imageSize === 'height');
      setGalleryWidth(widthImages);
      setGalleryHeight(heightImages);
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
