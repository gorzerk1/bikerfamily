import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyContext = React.createContext();

function ThemeProvider({ children }) {
  const [imageKey, setImageKey] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/awsdata')
      .then(response => {
        const {galleryWidth, galleryHeight} = response.data;
        setGalleryWidth(galleryWidth);
        setGalleryHeight(galleryHeight);
      })
      .catch(err => {
        console.error(err);
      });
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
