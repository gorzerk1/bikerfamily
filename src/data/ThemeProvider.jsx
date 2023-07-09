import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { shuffle } from 'lodash';

const MyContext = React.createContext()

function ThemeProvider({ children }) {
  const [imageKey, setImageKey] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState([]);
  const [backGroundVideos, setBackGroundVideo] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [contactObject, setContactObject] = useState(null);
  const [telegram, setTelegram] = useState(null);
  console.log(contactObject)
  
  const shuffleImages = (images) => {
    return shuffle(images).map(image => ({ ...image, key: uuidv4() }));
  }

  useEffect(() => {
    if (contactObject) {
        fetch('https://api.bikersil.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactObject)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}, [contactObject]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.bikersil.com/api/images`);
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }

        const images = await response.json();

        if (images.galleryWidth.length > 0) {
          const widthImages = shuffleImages(images.galleryWidth.slice(1));
          setGalleryWidth(widthImages);
        }

        if (images.galleryHeight.length > 0) {
          const heightImages = shuffleImages(images.galleryHeight.slice(1));
          setGalleryHeight(heightImages);
        }

        setImagesLoaded(true);
        
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

  const addContact = (newContact) => {
    setContactObject(newContact);
};




  return (
    <MyContext.Provider
      value={{
        setImageKey,
        imageKey,
        galleryHeight,
        galleryWidth,
        backGroundVideos,
        imagesLoaded,
        contactObject,
        addContact
      }}
    
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, ThemeProvider };