import './main.css';
import { useState, useEffect, useRef, useContext } from 'react';
import { MyContext } from '../../data/ThemeProvider';

function Main() {
  const { backGroundVideos } = useContext(MyContext);
  
  const [video, setVideo] = useState(() => {
    if(backGroundVideos.length > 0) {
      return backGroundVideos[Math.floor(Math.random() * backGroundVideos.length)];
    }
    return null;
  });

  const videoRef = useRef(null);

  useEffect(() => {
    const currentVideoRef = videoRef.current;

    function handleResize() {
      if (video && window.innerWidth < 700) {
        currentVideoRef.src = video.height;
      } else if(video) {
        currentVideoRef.src = video.width;
      }
    };

    function handleVideoEnd() {
      setVideo(() => {
        let newVideo;
        do {
          newVideo = backGroundVideos[Math.floor(Math.random() * backGroundVideos.length)];
        } while(newVideo === video)
        return newVideo;
      });
    }

    window.addEventListener('resize', handleResize);
    if (currentVideoRef) {
      currentVideoRef.addEventListener('ended', handleVideoEnd);
      handleResize();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentVideoRef) {
        currentVideoRef.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [video, backGroundVideos]);

  return (
    <div className="Main--body">
      <video ref={videoRef} autoPlay muted playsInline />
      <img src="../../down-arrow.png" alt="" className="Main--arrow" />
    </div>
  );
}

export default Main;
