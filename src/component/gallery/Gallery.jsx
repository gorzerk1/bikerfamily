import React, { useState, useContext, useEffect } from 'react';
import './gallery.css';
import { MyContext } from '../../data/ThemeProvider';

function Gallery() {
  const { galleryHeight, galleryWidth } = useContext(MyContext);
  const [heightImages, setHeightImages] = useState([]);
  const [widthImages, setWidthImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(10);
  const [imagesPerGroup, setImagesPerGroup] = useState(window.innerWidth);

  useEffect(() => {
    setHeightImages(shuffle([...galleryHeight]).slice(0, 5));
    setWidthImages(shuffle([...galleryWidth]).slice(0, 10));

    const handleResize = () => {
      setImagesPerGroup(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [galleryHeight, galleryWidth]);

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const handleRefresh = () => {
    setImageIndex(10);
    setHeightImages(shuffle([...galleryHeight]).slice(0, 5));
    setWidthImages(shuffle([...galleryWidth]).slice(0, 10));
  };

  return (
    <div className="gallery--body">
      <img src="../../marblebackground.png" alt="" />
      <div className="gallery--title">
        <div>הטיולים שלנו</div>
      </div>
      <div className="gallery--container">
        {widthImages.slice(0, imageIndex).map((img, index) => (
          <div className={`gallery--container--width${index + 1}`}>
            <img src={img.src} alt="" />
          </div>
        ))}
        {heightImages.slice(0, imageIndex).map((img, index) => (
          <div className={`gallery--container--height${index + 1}`}>
            <img src={img.src} alt="" />
          </div>
        ))}
      </div>
      <div className='gallery--refresh' onClick={handleRefresh}>
        <img src="../../refresh.png" alt="" />
      </div>
    </div>
  );
}

export default Gallery;
