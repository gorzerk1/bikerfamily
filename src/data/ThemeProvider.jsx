import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import sharp from 'sharp';

const MyContext = React.createContext();

function ThemeProvider({ children }) {
  const [imageKey, setImageKey] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState([]);

  useEffect(() => {
    AWS.config.update({
      region: process.env.REACT_APP_AWS_REGION
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
            bucketContents.forEach((bucketContent) => {
              const urlParams = {Bucket: 'bikerpicture', Key: bucketContent.Key};

              s3.getSignedUrl('getObject', urlParams, async (err, url) => {
                if (err) {
                  console.log('Error generating signed S3 URL:', err, err.stack);
                  reject(err);
                } else {
                  try {
                    const response = await fetch(url);
                    const blob = await response.blob();

                    sharp(blob.buffer)
                      .metadata()
                      .then(metadata => {
                        tempImageList.push({ Key: bucketContent.Key, metadata: metadata });
                        resolve(tempImageList);
                      })
                      .catch(err => console.log("Error reading image metadata with Sharp:", err));
                  } catch (error) {
                    console.error('Error fetching image from signed URL:', error);
                    reject(error);
                  }
                }
              });
            });
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
