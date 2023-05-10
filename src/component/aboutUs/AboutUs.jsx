import React, { useState, useEffect } from 'react';
import './aboutUs.css';

function AboutUs() {
  const getBackgroundImageSource = () => {
    const { clientWidth } = document.documentElement;
    if (clientWidth <= 611) {
      return '../../backgroundbike611.png';
    } else if (clientWidth <= 815) {
      return '../../backgroundbike815px.png';
    } else {
      return '../../backgroundbike.png';
    }
  };

  const [backgroundImageSrc, setBackgroundImageSrc] = useState(getBackgroundImageSource());
  useEffect(() => {
    const handleResize = () => {
      setBackgroundImageSrc(getBackgroundImageSource());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="aboutUs--body">
      <img src={backgroundImageSrc} alt="Background" />
      <div className='aboutUs--container'>
        <div className='aboutUs--half aboutUs--half--first'>
          <div className='aboutUs--half__title'>עלינו</div>
          <div className='aboutUs--paragraph'>בקהילת האופנועים, קיימת אחדות מיוחדת בין חובבי הדרך הפתוחה והרוח החופשית שמספקות שתי הגלגלים. חברים מכל הגילאים, המגדרים והמוצאים מתאחדים כאחד בשביל ליהנות זה מזה ולחלוק את התרבות המשולבת של האופנועים. הרגשה של שייכות ותמיכה הדדית מלווה את חברי הקהילה, שמבוססת על כיף והרפתקאות משותפות.</div>
          <div className='aboutUs--paragraph'>דרך טיולים משולבים, אירועים חברתיים ופעילויות תרבותיות, קהילת האופנועים מחזיקה ביחד, כפועל רב-פרטי שקולע ללבבות של כל רוכב.</div>
          <button className="custom-button">הצטרפו עלינו</button>
        </div>
        <div className='aboutUs--half'>
          <img src="../../bikerlogo.png" alt="" />
          <div className='aboutUs--amounts'>
            <div className='aboutUs--amount'>
            <div> חברי המשפחה</div>

              <div style={{color:"red"}}>300+</div>
            </div>
            <div className='aboutUs--amount'>
              <div>סה"כ אירועים</div>
              <div style={{color:"red"}}>50+</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
