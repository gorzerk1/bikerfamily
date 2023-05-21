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
  const fetchImages = (path, setImages) => {
    var s3 = new AWS.S3();
    var params = { Bucket: 'bikerpicture', Prefix: path };
    let tempImageList = [];
    let failCount = 0;

    s3.listObjectsV2(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        var bucketContents = data.Contents;
        for (var i = 0; i < bucketContents.length; i++) {
          var urlParams = {Bucket: 'bikerpicture', Key: bucketContents[i].Key};
          s3.getSignedUrl('getObject', urlParams, function(err, url){
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
                setImages([...tempImageList]);
              };
              img.onerror = function() {
                s3.getSignedUrl('getObject', urlParams, function(err, url){
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
                      setImages([...tempImageList]);
                    };
                    img.onerror = function() {
                      failCount++;
                      console.log("Failed images count: " + failCount);
                    };
                    img.src = url;
                  }
                });
              };
              img.src = url;
            }
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchImages('width/', setGalleryWidth);
    fetchImages('height/', setGalleryHeight);
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
