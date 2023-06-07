import './main.css';
import { useState, useEffect, useContext } from 'react';
import { MyContext } from '../../data/ThemeProvider';

function Main() {
  const { backGroundVideos } = useContext(MyContext);
  const [videoIndex, setVideoIndex] = useState(0);
  const videoSource = window.innerWidth < 700 ? backGroundVideos[videoIndex]?.height : backGroundVideos[videoIndex]?.width;
  console.log(backGroundVideos)
  console.log("1")
  useEffect(() => {
    const handleResize = () => {
      setVideoIndex((videoIndex + 1) % backGroundVideos.length);
    };

    const handleVideoEnd = () => {
      setVideoIndex((videoIndex + 1) % backGroundVideos.length);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('ended', handleVideoEnd);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('ended', handleVideoEnd);
    };
  }, [videoIndex, backGroundVideos]);

  return (
    <div className="Main--body">
      <video src={videoSource} autoPlay muted playsInline />
      <img src="../../down-arrow.png" alt="" className="Main--arrow" />
    </div>
  );
}

export default Main;
