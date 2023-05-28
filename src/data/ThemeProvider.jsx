import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';

const MyContext = React.createContext();

function ThemeProvider({ children }) {
  const [imageKey, setImageKey] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState([]);

  useEffect(() => {
    AWS.config.update({
      region: "eu-south-1"
    });

    const fetchImagesFromAWS = async (path) => {
      return new Promise((resolve, reject) => {
        var s3 = new AWS.S3();
        var params = { Bucket: 'bikerpicture', Prefix: path };
        let tempImageList = [];
    
        s3.listObjectsV2(params, function(err, data) {
          if (err) {
            console.log('Error listing S3 objects:', err, err.stack);
            reject(err);
          } else {
            var bucketContents = data.Contents;
    
            // Store promises for each getSignedUrl operation
            let urlPromises = bucketContents.map(bucketContent => {
              return new Promise((resolve, reject) => {
                const urlParams = {Bucket: 'bikerpicture', Key: bucketContent.Key};
    
                s3.getSignedUrl('getObject', urlParams, async (err, url) => {
                  if (err) {
                    console.log('Error generating signed S3 URL:', err, err.stack);
                    reject(err);
                  } else {
                    tempImageList.push({ Key: bucketContent.Key, url: url });
                    resolve();
                  }
                });
              });
            });
    
            // After all promises are resolved, then resolve the main promise
            Promise.all(urlPromises)
              .then(() => resolve(tempImageList))
              .catch((err) => reject(err));
          }
        });
      });
    };
    

    const fetchData = async () => {
      const galleryWidthData = await fetchImagesFromAWS('width/');
      const galleryHeightData = await fetchImagesFromAWS('height/');
      setGalleryWidth(galleryWidthData);
      setGalleryHeight(galleryHeightData);
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
