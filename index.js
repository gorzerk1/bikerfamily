const PORT = 8000;
const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const sharp = require('sharp');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000/'
}));

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION
});

app.get('/awsdata', cors(), async (req, res) => {
    const galleryWidth = await fetchImagesFromAWS('width/');
    const galleryHeight = await fetchImagesFromAWS('height/');
    console.log(galleryWidth);
    res.json({galleryWidth, galleryHeight});
});

const fetchImagesFromAWS = async (path) => {
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

                    const handleImageLoad = async (err, url) => {
                        if (err) {
                            console.log(err, err.stack);
                            reject(err);
                        } else {
                            try {
                                // Fetch the actual image data from the signed URL
                                const response = await axios.get(url, { responseType: 'arraybuffer' });
                                const imageBuffer = Buffer.from(response.data, 'binary');

                                // Check if the imageBuffer is empty
                                if (imageBuffer.length === 0) {
                                    console.error(`Failed to load image data from URL: ${url}`);
                                    failCount++;
                                    console.log("Failed images count: " + failCount);
                                    if (loadCount === bucketContents.length - failCount) {
                                        resolve(tempImageList);
                                    }
                                } else {
                                    // Use sharp
                                    sharp(imageBuffer)
                                        .metadata()
                                        .then(metadata => {
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
                                            tempImageList.push({src: url, width: width, height: height, imageSize: imageSize, key: bucketContent.Key});
                                            loadCount++;
                                            if (loadCount === bucketContents.length - failCount) {
                                                resolve(tempImageList);
                                            }
                                        })
                                        .catch(err => {
                                            failCount++;
                                            console.log("Failed images count: " + failCount);
                                            if (loadCount === bucketContents.length - failCount) {
                                                resolve(tempImageList);
                                            }
                                        });
                                }
                            } catch (error) {
                                console.error('Error fetching image from signed URL:', error);
                                reject(error);
                            }
                        }
                    };

                    s3.getSignedUrl('getObject', urlParams, handleImageLoad);
                });
            }
        });
    });
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
