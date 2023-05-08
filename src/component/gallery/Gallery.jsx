import React, { useState, useContext, useEffect } from 'react';
import './gallery.css';
import GalleryData from '../../data/GalleryData.jsx';
import {Link} from "react-router-dom"
import { MyContext } from '../../data/ThemeProvider';

function Gallery() {
  const [galleryImages] = useState(GalleryData);
  const [currentGroup, setCurrentGroup] = useState(1);
  const { setImageIndex } = useContext(MyContext);

  const getWindowWidth = () => {
    const { clientWidth } = document.documentElement;
    if (clientWidth <= 650) {
      return 6;
    } else if (clientWidth <= 960) {
      return 9;
    } else if (clientWidth <= 1275) {
      return 12;
    } else {
      return 15;
    }
  };

  const [imagesPerGroup, setImagesPerGroup] = useState(getWindowWidth());
  const totalGroups = Math.ceil(galleryImages.length / imagesPerGroup);

  useEffect(() => {
    const handleResize = () => {
      setImagesPerGroup(getWindowWidth());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  );
}

export default Gallery;