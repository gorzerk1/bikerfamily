import React from 'react'
import './aboutUs.css';


function AboutUs() {
  return (
    <div className="aboutUs--body">
      <img src="../../backgroundbike.jpg" alt="" />
      <div className='aboutUs--container'>
      <div className='aboutUs--half'>
          <div>עלינו</div>
          <div className='aboutUs--paragraph'>בקהילת האופנועים, קיימת אחדות מיוחדת בין חובבי הדרך הפתוחה והרוח החופשית שמספקות שתי הגלגלים. חברים מכל הגילאים, המגדרים והמוצאים מתאחדים כאחד בשביל ליהנות זה מזה ולחלוק את התרבות המשולבת של האופנועים. הרגשה של שייכות ותמיכה הדדית מלווה את חברי הקהילה, שמבוססת על כיף והרפתקאות משותפות.</div>
          <div className='aboutUs--paragraph'>דרך טיולים משולבים, אירועים חברתיים ופעילויות תרבותיות, קהילת האופנועים מחזיקה ביחד, כפועל רב-פרטי שקולע ללבבות של כל רוכב.</div>
          <button className="custom-button">הצטרפו עלינו</button>
        </div>
        <div className='aboutUs--half'>
          <img src="../../bikerlogo.png" alt="" />
          <div className='aboutUs--amount'>
            <div style={{color:"red"}}>300+</div>
            <div> חברי המשפחה</div>
          </div>
          <div className='aboutUs--amount'>
            <div style={{color:"red"}}>50+</div>
            <div>ס"הכ אירועים</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
