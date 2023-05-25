import './aboutUs.css';
import React , { useState, useEffect } from 'react'

function AboutUs() {
  const [smallScreen, setSmallScreen] = useState(window.innerWidth < 770 ? "2" : '');
  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 770 ? 1 : '');
    };

    window.addEventListener('resize', handleResize);
    // Clean up function
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="aboutUs--body">
      <img src={`../../backgroundbike${smallScreen}.jpg`} alt="Background Bike" />
      <div className='aboutUs--container'>
        <div className='aboutUs--half aboutUs--half--first'>
          <div className='aboutUs--half__title'>עלינו</div>
          <div className='aboutUs--paragraph'>בקהילת האופנועים, קיימת אחדות מיוחדת בין חובבי הדרך הפתוחה והרוח החופשית שמספקות שתי הגלגלים. חברים מכל הגילאים, המגדרים והמוצאים מתאחדים כאחד בשביל להנות זה מזה ולחלוק את התרבות המשולבת של האופנועים. הרגשה של שייכות ותמיכה הדדית מלווה את חברי הקהילה, שמבוססת על כיף והרפתקאות משותפות.</div>
          <div className='aboutUs--paragraph'>דרך טיולים משולבים, אירועים חברתיים ופעילויות תרבותיות, קהילת האופנועים מחזיקה ביחד, כפועל רב-פרטי שקולע ללבבות של כל רוכב.</div>
          <a className="custom-button" href='https://www.instagram.com/family.bikers.il/'>הצטרפו עלינו</a>
        </div>
        <div className='aboutUs--half'>
          <img src="../../bikerlogo.png" alt="Biker Logo" />
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
