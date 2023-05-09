import './main.css';
import { useState, useEffect } from 'react';

function Main() {
  const [videoSrc, setVideoSrc] = useState("https://bikerpicture.s3.eu-south-1.amazonaws.com/video/DeadSeaEnd169.mp4");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 700) {
        setVideoSrc("https://bikerpicture.s3.eu-south-1.amazonaws.com/video/DeadSeaEnd916.mp4");
      } else {
        setVideoSrc("https://bikerpicture.s3.eu-south-1.amazonaws.com/video/DeadSeaEnd169.mp4");
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="Main--body">
      <video src={videoSrc} autoPlay loop muted playsInline preload="auto" />
      <img src="../../down-arrow.png" alt="" className="Main--arrow" />
    </div>
  );
}

export default Main;
