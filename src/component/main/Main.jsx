import './main.css';
import { useState, useEffect, useContext, useRef } from 'react';
import { MyContext } from '../../data/ThemeProvider';

function Main() {
  const { backGroundVideos } = useContext(MyContext);
  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef(null);

  const videoSource = window.innerWidth < 700 ? backGroundVideos[videoIndex]?.height : backGroundVideos[videoIndex]?.width;

  useEffect(() => {
    const currentVideoRef = videoRef.current;

    const handleVideoEnd = () => {
      setVideoIndex((videoIndex + 1) % backGroundVideos.length);
    };

    if (currentVideoRef) {
      currentVideoRef.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (currentVideoRef) {
        currentVideoRef.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [videoIndex, backGroundVideos]);

  return (
    <div className="Main--body">
      <video ref={videoRef} src={videoSource} autoPlay muted playsInline />
      <img src="../../down-arrow.png" alt="" className="Main--arrow" />
    </div>
  );
}

export default Main;
