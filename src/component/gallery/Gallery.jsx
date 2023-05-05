import React, { useState, useContext } from 'react';
import './gallery.css';
import GalleryData from '../../data/GalleryData.jsx';
import {Link} from "react-router-dom"
import { MyContext } from '../../data/ThemeProvider';

function Gallery() {
  const [galleryImages, setGalleryImages] = useState(GalleryData);
  const [currentGroup, setCurrentGroup] = useState(1);
  const { setImageIndex } = useContext(MyContext);

  const imagesPerGroup = 15;
  const totalGroups = Math.ceil(galleryImages.length / imagesPerGroup);
  

  const moveGroup = (direction) => {
    if (direction === 'left' && currentGroup > 1) {
      setCurrentGroup(currentGroup - 1);
    } else if (direction === 'right' && currentGroup < totalGroups) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  return (
    <div className="gallery--body">
      <img src="../../marblebackground.png" alt="" />
      <div className="gallery--title">
        <div>גלריה שלנו</div>
      </div>
      <div className="gallery--width">
        <div className="gallery--container">
          {galleryImages
            .slice((currentGroup - 1) * imagesPerGroup, currentGroup * imagesPerGroup)
            .map((image, index) => (
                <Link to="/fullGallery" className="gallery--frame" key={index}>
                        <img
                          src={image.src}
                          alt=""
                          onClick={() => setImageIndex(index + (currentGroup - 1) * imagesPerGroup)}
                        />
                </Link>
            ))}
        </div>
        <div className="gallery--showPictures">
          <img
            src="../../eventsup/left-arrow.png"
            alt=""
            onClick={() => moveGroup('left')}
          />
          <div>
            {currentGroup} / {totalGroups}
          </div>
          <img
            src="../../eventsup/right-arrow.png"
            alt=""
            onClick={() => moveGroup('right')}
          />
        </div>
      </div>
    </div>
  );
}

export default Gallery;