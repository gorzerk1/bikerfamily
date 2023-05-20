import React, { useState, useEffect } from 'react'
var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: "AKIAZCTTOOOLWM7QUB4H",
  secretAccessKey: "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",
  region: "eu-south-1" 
});

const MyContext = React.createContext()

function ThemeProvider({ children }) {
  const [imageIndex, setImageIndex] = useState(null)
  const [galleryHeight, setGalleryHeight] = useState([])
  const [galleryWidth, setGalleryWidth] = useState([])

  console.log(galleryHeight)

  const fetchImages = (path, setImages, width, height) => {
    var s3 = new AWS.S3();
    var params = { Bucket: 'bikerpicture', Prefix: path };

    s3.listObjectsV2(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else {
        var bucketContents = data.Contents;
        for (var i = 0; i < bucketContents.length; i++) {
          var urlParams = {Bucket: 'bikerpicture', Key: bucketContents[i].Key};
          s3.getSignedUrl('getObject', urlParams, function(err, url){
            if (err) console.log(err, err.stack);
            else {
              let imageSize = '';
              if (width === 645 && height === 839) imageSize = 'height';
              if (width === 850 && height === 567) imageSize = 'width';

              setImages(images => [...images, {src: url, width: width, height: height, imageSize: imageSize}]);
            }
          });
        }
      }
    });
  };

  useEffect(() => {
    fetchImages('width/', setGalleryWidth, 850, 567);
    fetchImages('height/', setGalleryHeight, 645, 839);
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
