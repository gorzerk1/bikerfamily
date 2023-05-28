import React, { useState, useEffect } from 'react';

const MyContext = React.createContext();

function ThemeProvider({ children }) {
  const [imageKey, setImageKey] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState([]);

  useEffect(() => {
    const fetchData = async (path) => {
      // Send HTTP GET request to server endpoint
      const response = await fetch(`http://backend-server-ip:port/api/images/${path}`);
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      // Parse JSON response
      const images = await response.json();
      return images;
    };

    const fetchGalleryData = async () => {
      try {
        const galleryWidthData = await fetchData('width');
        const galleryHeightData = await fetchData('height');
        setGalleryWidth(galleryWidthData);
        setGalleryHeight(galleryHeightData);
      } catch (err) {
        console.error('Failed to fetch gallery data:', err);
      }
    };

    fetchGalleryData();
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
