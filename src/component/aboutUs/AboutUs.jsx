
import './aboutUs.css';
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import VisibilitySensor from 'react-visibility-sensor';

function AboutUs() {


  const [titleVisible, setTitleVisible] = useState(false);
  const [titleActive, setTitleActive] = useState(true);
  const [firstParagraphVisible, setFirstParagraphVisible] = useState(false);
  const [firstParagraphActive, setFirstParagraphActive] = useState(true);
  const [secondParagraphVisible, setSecondParagraphVisible] = useState(false);
  const [secondParagraphActive, setSecondParagraphActive] = useState(true);

  const [logoVisible, setLogoVisible] = useState(false);
  const [logoActive, setLogoActive] = useState(true);
  const [firstAmountVisible, setFirstAmountVisible] = useState(false);
  const [firstAmountActive, setFirstAmountActive] = useState(true);
  const [secondAmountVisible, setSecondAmountVisible] = useState(false);
  const [secondAmountActive, setSecondAmountActive] = useState(true);

  const animationConfig = { duration: 1500 }; 

  const titleAnimation = useSpring({ config: animationConfig, opacity: titleVisible ? 1 : 0, transform: titleVisible ? `translateY(0)` : `translateY(-50px)` });
  const firstParagraphAnimation = useSpring({ config: animationConfig, opacity: firstParagraphVisible ? 1 : 0, transform: firstParagraphVisible ? `translateY(0)` : `translateY(-50px)` });
  const secondParagraphAnimation = useSpring({ config: animationConfig, opacity: secondParagraphVisible ? 1 : 0, transform: secondParagraphVisible ? `translateY(0)` : `translateY(-50px)` });

  const logoAnimation = useSpring({ config: animationConfig, opacity: logoVisible ? 1 : 0, transform: logoVisible ? `translateY(0)` : `translateY(50px)` });
  const firstAmountAnimation = useSpring({ config: animationConfig, opacity: firstAmountVisible ? 1 : 0, transform: firstAmountVisible ? `translateY(0)` : `translateY(50px)` });
  const secondAmountAnimation = useSpring({ config: animationConfig, opacity: secondAmountVisible ? 1 : 0, transform: secondAmountVisible ? `translateY(0)` : `translateY(50px)` });

  return (
    <div className="aboutUs--body">
      <img src="../../backgroundbike.jpg" alt="Background Bike" />
      <div className='aboutUs--container'>
        <div className='aboutUs--rightPart'>
          <VisibilitySensor active={titleActive} onChange={(isVisible) => { setTitleVisible(isVisible); setTitleActive(!isVisible); }} delayedCall partialVisibility>
            <animated.div style={titleAnimation} className='aboutUs--half__title'><div>עלינו</div></animated.div>
          </VisibilitySensor>
          <VisibilitySensor active={firstParagraphActive} onChange={(isVisible) => { setFirstParagraphVisible(isVisible); setFirstParagraphActive(!isVisible); }} delayedCall partialVisibility>
            <animated.div style={firstParagraphAnimation} className='aboutUs--paragraph'>"בייקרס-ישראל" היא קהילה ייחודית של אופנוענים המונה יותר  מ300 חברים, והיא במגמת הרחבה וקולטת לשורותיה חברים נוספים, המתאימים לרוח הקהילה. ב"בייקרס-ישראל", חברים ישראלים בני כל הגילאים, ללא הבדל מגדר, דת או מוצא. לחבריי הקהילה אופנועים מסוגים ומודלים שונים, כשאת כולם מאחדת האהבה לאופנוע, החברות, והרוח החופשית שהדרך הפתוחה מעניקה ברכיבה הדו-גלגלית. הרגשה של שייכות ותמיכה הדדית מלווה את חבריי הקהילה, הרגשה המבוססת על חוויות והרפתקאות משותפות. את הקהילה הקימו ומנהלים יהונתן ודין.</animated.div>
          </VisibilitySensor>
          <VisibilitySensor active={secondParagraphActive} onChange={(isVisible) => { setSecondParagraphVisible(isVisible); setSecondParagraphActive(!isVisible); }} delayedCall partialVisibility>
            <animated.div style={secondParagraphAnimation} className='aboutUs--paragraph'>קהילת "בייקרס-ישראל", מארגנת לחבריה טיולים משולבים, אירועים חברתיים, ופעילויות חברתיות. הנהלת  "בייקרס-ישראל" קשובה לחבריי הקהילה באופן הקולע ללבו והעדפותיו של כל רוכב ורוכב.</animated.div>
          </VisibilitySensor>
        </div>
        <div className='aboutUs--leftPart'>
          <VisibilitySensor active={logoActive} onChange={(isVisible) => { setLogoVisible(isVisible); setLogoActive(!isVisible); }} delayedCall partialVisibility>
            <animated.div style={logoAnimation} className='aboutUs--logo'>
              <img src="../../bikerlogo.png" alt="Biker Logo" />  
            </animated.div>
          </VisibilitySensor>
          <VisibilitySensor active={firstAmountActive} onChange={(isVisible) => { setFirstAmountVisible(isVisible); setFirstAmountActive(!isVisible); }} delayedCall partialVisibility>
            <animated.div style={firstAmountAnimation} className='aboutUs--amount'>
              <div> חברי המשפחה</div>
              <div style={{color:"red"}}>300+</div>
            </animated.div>
          </VisibilitySensor>
          <VisibilitySensor active={secondAmountActive} onChange={(isVisible) => { setSecondAmountVisible(isVisible); setSecondAmountActive(!isVisible); }} delayedCall partialVisibility>
            <animated.div style={secondAmountAnimation} className='aboutUs--amount'>
              <div>טיולים</div>
              <div style={{color:"red"}}>30+</div>
            </animated.div>
          </VisibilitySensor>
        </div>
      </div>
    </div>
  )
}

export default AboutUs;
