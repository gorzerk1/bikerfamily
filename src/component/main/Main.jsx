import './main.css';
import { useState, useEffect, useRef } from 'react';
import { VideoData } from '../../data/VideoData.jsx';

function Main() {
  const [videoIndex, setVideoIndex] = useState(Math.floor(Math.random() * VideoData.length));
  const videoRef = useRef(null);

  useEffect(() => {
    const currentVideoRef = videoRef.current;

    function handleResize() {
      if (window.innerWidth < 700) {
        currentVideoRef.src = VideoData[videoIndex].height;
      } else {
        currentVideoRef.src = VideoData[videoIndex].width;
      }
    };

    function handleVideoEnd() {
      setVideoIndex(() => {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * VideoData.length);
        } while(newIndex === videoIndex)
        return newIndex;
      });
    }

    window.addEventListener('resize', handleResize);
    currentVideoRef.addEventListener('ended', handleVideoEnd);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentVideoRef) {
        currentVideoRef.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [videoIndex]);

  return (
    <div className="Main--body">
      <video ref={videoRef} autoPlay muted playsInline />
      <img src="../../down-arrow.png" alt="" className="Main--arrow" />
    </div>
  );
}

export default Main;
