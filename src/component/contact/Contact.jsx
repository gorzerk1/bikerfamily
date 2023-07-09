import React, { useState, useEffect} from "react";
import "./contact.css";
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';


function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [name, setName] = useState("");
  const [bike, setBike] = useState("");
  const [location, setLocation] = useState("");
  const [instagram, setInstagram] = useState("");
  const [telegram, setTelegram] = useState("");
  const [telegramValid, setTelegramValid] = useState(false)
  const [nameError, setNameError] = useState(false);
  const [instagramError, setInstagramError] = useState(false);
  const [bikeError, setBikeError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [telegramError, setTelegramError] = useState(false);
  const [userHasClicked, setUserHasClicked] = useState({name: false, instagram: false, bike: false, location: false, telegram: false});

  const titleProps = useSpring({
    from: {opacity: 0, transform: 'translate3d(0,50px,0)'},
    to: {opacity: inView ? 1 : 0, transform: inView ? 'translate3d(0,0px,0)' : 'translate3d(0,50px,0)'},
    delay: 500,
    config: {duration: 1000},
    reset: !inView,
  });

  const subtitleProps = useSpring({
    from: {opacity: 0, transform: 'translate3d(0,50px,0)'},
    to: {opacity: inView ? 1 : 0, transform: inView ? 'translate3d(0,0px,0)' : 'translate3d(0,50px,0)'},
    delay: 1000,
    config: {duration: 1000},
    reset: !inView,
  });
  const input1Props = useSpring({
    from: {opacity: 0, transform: 'translate3d(0,50px,0)'},
    to: {opacity: inView ? 1 : 0, transform: inView ? 'translate3d(0,0px,0)' : 'translate3d(0,50px,0)'},
    delay: 1500,
    config: {duration: 1000},
    reset: !inView,
  });

  const input2Props = useSpring({
    from: {opacity: 0, transform: 'translate3d(0,50px,0)'},
    to: {opacity: inView ? 1 : 0, transform: inView ? 'translate3d(0,0px,0)' : 'translate3d(0,50px,0)'},
    delay: 2000,
    config: {duration: 1000},
    reset: !inView,
  });

  const input3Props = useSpring({
    from: {opacity: 0, transform: 'translate3d(0,50px,0)'},
    to: {opacity: inView ? 1 : 0, transform: inView ? 'translate3d(0,0px,0)' : 'translate3d(0,50px,0)'},
    delay: 2500,
    config: {duration: 1000},
    reset: !inView,
  });

  const input4Props = useSpring({
    from: {opacity: 0, transform: 'translate3d(0,50px,0)'},
    to: {opacity: inView ? 1 : 0, transform: inView ? 'translate3d(0,0px,0)' : 'translate3d(0,50px,0)'},
    delay: 3000,
    config: {duration: 1000},
    reset: !inView,
  });
  const input5Props = useSpring({
    from: {opacity: 0, transform: 'translate3d(0,50px,0)'},
    to: {opacity: inView ? 1 : 0, transform: inView ? 'translate3d(0,0px,0)' : 'translate3d(0,50px,0)'},
    delay: 3500,
    config: {duration: 1000},
    reset: !inView,
  });

  const aProps = useSpring({
    from: {opacity: 0, transform: 'translate3d(0,50px,0)'},
    to: {opacity: inView ? 1 : 0, transform: inView ? 'translate3d(0,0px,0)' : 'translate3d(0,50px,0)'},
    delay: 3500,
    config: {duration: 1000},
    reset: !inView,
  });


  function validate() {
    const nameRegex = /^[a-zA-Zא-ת\s]{2,}$/;
    const telegramRegex = /^[a-zA-Zא-ת]{3,}$/;
    let isValid = true;
  
    if (!nameRegex.test(name)) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }
  
    if (!instagram.includes('instagram.com/')) {
      setInstagramError(true);
      isValid = false;
    } else {
      setInstagramError(false);
    }
  
    if (!bike) {
      setBikeError(true);
      isValid = false;
    } else {
      setBikeError(false);
    }
  
    if (!location) {
      setLocationError(true);
      isValid = false;
    } else {
      setLocationError(false);
    }
  
    if (!telegramRegex.test(telegram)) {
      setTelegramError(true);
      isValid = false;
    } else {
      setTelegramError(false);
    }
  
    return isValid;
  }
  

  useEffect(() => {
    const nameRegex = /^[a-zA-Zא-ת\s]{2,}$/;
    const telegramRegex = /^[a-zA-Zא-ת]{3,}$/;
    if (!nameRegex.test(name) && userHasClicked.name) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  
    if (!instagram.includes('instagram.com/') && userHasClicked.instagram) {
      setInstagramError(true);
    } else {
      setInstagramError(false);
    }
  
    if (!bike && userHasClicked.bike) {
      setBikeError(true);
    } else {
      setBikeError(false);
    }
  
    if (!location && userHasClicked.location) {
      setLocationError(true);
    } else {
      setLocationError(false);
    }
  

    if (!telegramRegex.test(telegram) && userHasClicked.telegram) {
      setTelegramError(true);
    } else {
      setTelegramError(false);
    }
  }, [name, userHasClicked.name, instagram, userHasClicked.instagram, bike, userHasClicked.bike, location, userHasClicked.location, telegram, userHasClicked.telegram]);

  async function checkIfUserExists(telegram) {
    const response = await fetch(`https://api.bikersil.com/api/contact/exist?telegram=${encodeURIComponent(telegram)}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      return data.userExists;
    } catch (error) {
      console.error('Failed to parse JSON:', text);
      throw error;
    }
  }
  
  async function handleTelegramChange(e) {
    const value = e.target.value;
    setTelegram(value);
    setUserHasClicked(prev => ({ ...prev, telegram: true }));
    try {
        const userExists = await checkIfUserExists(value); 
        setTelegramValid(!userExists);
        if(userExists){
            setTelegramError(true);
        }else{
            setTelegramError(false);
        }
    } catch (error) {
        console.log(error);
    }
  }

  const handleClick = async (e) => {
    if (!validate()) {
        e.preventDefault();
    } else {
        const userExists = await checkIfUserExists(telegram);
        if (userExists) {
          e.preventDefault();
          setTelegramValid(false);
          setTelegramError(true);
        }
    }
  }
  
  return (
    <div className="contact--body" ref={ref}>
      <img src="../../marblebackground2.jpg" alt="" />
      <div className='contact--container'>
        <animated.div style={titleProps} className='contact--title'>הצטרפו אלינו</animated.div>
        <animated.div style={subtitleProps} className='contact--subtitle'>אנא מלאו את השדות שלפניכם</animated.div>
        <div className='contact-textarea'>
          <animated.div style={input1Props}>
            {nameError && <div className="contact--errors" dir="rtl">* צריך לרשום לפנות 4 ספרות בעברית או אנגלית</div>}
            <input type={nameError ? 'text1' : 'text'} placeholder="מה שמך ?" dir="rtl" value={name} onChange={(e) => {setName(e.target.value); setUserHasClicked(prev => ({...prev, name: true}))}} />
          </animated.div>
          <animated.div style={input2Props}>
            {bikeError && <div className="contact--errors" dir="rtl">* צריך לרשום את האופנוע שלך</div>}
            <input type={bikeError ? 'text1' : 'text'} placeholder="על מה את/ה רוכב/ת?" dir="rtl" value={bike} onChange={(e) => {setBike(e.target.value); setUserHasClicked(prev => ({...prev, bike: true}))}} />
          </animated.div>
          <animated.div style={input3Props}>
            {locationError && <div className="contact--errors" dir="rtl">* צריך לרשום מיקום</div>}
            <input type={locationError ? 'text1' : 'text'} placeholder="מאיפה בארץ ? (עיר \ ישוב)" dir="rtl" value={location} onChange={(e) => {setLocation(e.target.value); setUserHasClicked(prev => ({...prev, location: true}))}} />
          </animated.div>
          <animated.div style={input4Props}>
            {telegramError && <div className="contact--errors" dir="rtl">הנה שימו משתמש אחר *</div>}
            <input 
              type={telegramError ? 'text1' : 'text'} 
              placeholder="שם משתמש בטלגרם"  
              dir="rtl" 
              value={telegram} 
              onChange={handleTelegramChange}
            />
          </animated.div>
          <animated.div style={input5Props}>
            {instagramError && <div className="contact--errors" dir="rtl">* צריך לרשום את הקישור של אינסטגרם</div>}
            <input type={instagramError ? 'text1' : 'text'} placeholder="קישור של אינסטגרם" dir="rtl" value={instagram} onChange={(e) => {setInstagram(e.target.value); setUserHasClicked(prev => ({...prev, instagram: true}))}} />
          </animated.div>
          <animated.a 
            style={aProps} 
            href="https://t.me/+4Vmt2NT244YyMzJk" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-whatsapp" 
            onClick={handleClick}
          >
            צרו קשר דרך טלגרם
          </animated.a>
        </div>
      </div>
    </div>
  );
}

export default Contact;