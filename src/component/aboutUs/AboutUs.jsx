import './aboutUs.css';
import React, { useState, useEffect } from 'react';

function AboutUs() {


  return (
    <div className="aboutUs--body">
      <img src="../../backgroundbike.jpg" alt="Background Bike" />
      <div className='aboutUs--container'>
        <div className='aboutUs--rightPart'>
          <div className='aboutUs--half__title'><div>עלינו</div></div>
          <div className='aboutUs--paragraph'>"בייקרס-ישראל" היא קהילה ייחודית של אופנוענים המונה יותר  מ300 חברים, והיא במגמת הרחבה וקולטת לשורותיה חברים נוספים, המתאימים לרוח הקהילה. ב"בייקרס-ישראל", חברים ישראלים בני כל הגילאים, ללא הבדל מגדר, דת או מוצא. לחבריי הקהילה אופנועים מסוגים ומודלים שונים, כשאת כולם מאחדת האהבה לאופנוע, החברות, והרוח החופשית שהדרך הפתוחה מעניקה ברכיבה הדו-גלגלית. הרגשה של שייכות ותמיכה הדדית מלווה את חבריי הקהילה, הרגשה המבוססת על חוויות והרפתקאות משותפות. את הקהילה הקימו ומנהלים יהונתן ודין. </div>
          <div className='aboutUs--paragraph'>קהילת "בייקרס-ישראל", מארגנת לחבריה טיולים משולבים, אירועים חברתיים, ופעילויות חברתיות. הנהלת  "בייקרס-ישראל" קשובה לחבריי הקהילה באופן הקולע ללבו והעדפותיו של כל רוכב ורוכב.</div>
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
