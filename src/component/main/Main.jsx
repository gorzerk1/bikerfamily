import './main.css';
import { useState, useEffect, useRef } from 'react';
import { VideoData } from '../../data/VideoData.jsx';

function Main() {
  const [videoIndex, setVideoIndex] = useState(Math.floor(Math.random() * VideoData.length));
  const videoRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 700) {
        videoRef.current.src = VideoData[videoIndex].height;
      } else {
        videoRef.current.src = VideoData[videoIndex].width;
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
    videoRef.current.addEventListener('ended', handleVideoEnd);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
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