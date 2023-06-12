import './aboutUs.css';
import React, { useState, useEffect } from 'react';

function AboutUs() {
  const [backgroundImgSrc, setBackgroundImgSrc] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setBackgroundImgSrc(window.innerWidth < 770 ? "../../backgroundbike.jpg" : "../../backgroundbike2.jpg");
    };

    // Initialize the image source
    handleResize();

    window.addEventListener('resize', handleResize);
    // Clean up function
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="aboutUs--body">
      <img src={backgroundImgSrc} alt="Background Bike" />
      <div className='aboutUs--container'>
        <div className='aboutUs--rightPart'>
          <div className='aboutUs--half__title'><div>עלינו</div></div>
          <div className='aboutUs--paragraph'>בקהילת האופנועים, קיימת אחדות מיוחדת בין חובבי הדרך הפתוחה והרוח החופשית שמספקות שתי הגלגלים. חברים מכל הגילאים, המגדרים והמוצאים מתאחדים כאחד בשביל להנות זה מזה ולחלוק את התרבות המשולבת של האופנועים. הרגשה של שייכות ותמיכה הדדית מלווה את חברי הקהילה, שמבוססת על כיף והרפתקאות משותפות.</div>
          <div className='aboutUs--paragraph'>דרך טיולים משולבים, אירועים חברתיים ופעילויות תרבותיות, קהילת האופנועים מחזיקה ביחד, כפועל רב-פרטי שקולע ללבבות של כל רוכב.</div>
          <div className='aboutUs--buttonWrapper'>
          </div>          
          
        </div>
        <div className='aboutUs--leftPart'>
            <div className='aboutUs--logo'>
              <img src="../../bikerlogo.png" alt="Biker Logo" />
            </div>
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
  );
}

export default AboutUs;
