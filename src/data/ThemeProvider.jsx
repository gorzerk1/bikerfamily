import React, { useState, useEffect } from 'react';
var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: "AKIAZCTTOOOLWM7QUB4H",
  secretAccessKey: "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",
  region: "eu-south-1" 
});

const MyContext = React.createContext()

function ThemeProvider({ children }) {
  const [imageIndex, setImageIndex] = useState(null);
  const [galleryHeight, setGalleryHeight] = useState([]);
  const [galleryWidth, setGalleryWidth] = useState([]);

  console.log(galleryHeight)
  console.log(galleryWidth)
  
  const fetchImages = (path) => {
    return new Promise((resolve, reject) => {
      var s3 = new AWS.S3();
      var params = { Bucket: 'bikerpicture', Prefix: path };
      let tempImageList = [];
      let failCount = 0;

      s3.listObjectsV2(params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
          reject(err);
        } else {
          var bucketContents = data.Contents;
          let loadCount = 0;
          bucketContents.forEach((bucketContent) => {
            const urlParams = {Bucket: 'bikerpicture', Key: bucketContent.Key};

            const handleImageLoad = (err, url) => {
              if (err) console.log(err, err.stack);
              else {
                let img = new Image();
                img.onload = function() {
                  let width, height, imageSize;
                  if (path === 'width/') {
                    width = 850;
                    height = 567;
                    imageSize = "width";
                  } else if (path === 'height/') {
                    width = 645;
                    height = 839;
                    imageSize = "height";
                  }
                  tempImageList.push({src: url, width: width, height: height, imageSize: imageSize});
                  loadCount++;
                  if (loadCount === bucketContents.length) {
                    resolve(tempImageList);
                  }
                };
                img.onerror = function() {
                  failCount++;
                  console.log("Failed images count: " + failCount);
                };
                img.src = url;  // Moved inside the callback
              }
            };
            
            s3.getSignedUrl('getObject', urlParams, handleImageLoad);
            

            s3.getSignedUrl('getObject', urlParams, handleImageLoad);
          });
        }
      });
    });
  };

  useEffect(() => {
    Promise.all([
      fetchImages('width/'),
      fetchImages('height/'),
    ])
    .then(([galleryWidth, galleryHeight]) => {
      setGalleryWidth(galleryWidth);
      setGalleryHeight(galleryHeight);
    });
  }, []);

  return (
    <MyContext.Provider
      value={{
        setImageIndex,
        imageIndex,
        galleryHeight,
        galleryWidth
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export { MyContext, ThemeProvider };
