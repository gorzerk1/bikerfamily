import React, { useState, useEffect } from "react";
import "./contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [bike, setBike] = useState("");
  const [location, setLocation] = useState("");
  const [instagram, setInstagram] = useState(""); 
  const [nameError, setNameError] = useState(false);
  const [instagramError, setInstagramError] = useState(false); 
  const [bikeError, setBikeError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [userHasClicked, setUserHasClicked] = useState({name: false, instagram: false, bike: false, location: false}); 

  const whatsappMessage = `שלום שמי ${name}.\nאני גר/ה ב${location}.\nהאופנוע שיש לי הוא ${bike}.\nהאינסגרם שלי הוא :\n${instagram}.`;
  const whatsappLink = `https://chat.whatsapp.com/Bqfustz1sNaFuSa6ZRduJu?text=${encodeURIComponent(whatsappMessage)}`;
  console.log(whatsappMessage)
  function validate(){
    const nameRegex = /^[a-zA-Zא-ת\s]{2,}$/;
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

    return isValid;
  }

  useEffect(() => {
    const nameRegex = /^[a-zA-Zא-ת\s]{2,}$/;

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
  }, [name, userHasClicked.name, instagram, userHasClicked.instagram, bike, userHasClicked.bike, location, userHasClicked.location]);

  return (
    <div className="contact--body">
      <img src="../../marblebackground2.jpg" alt="" />
      <div className='contact--container'>
      <div className='contact--title'>הצטרפו אלינו</div>
        <div className='contact--subtitle'>אנא מלאו את השדות שלפניכם</div>
        <div className='contact-textarea'>
          <div>
            {nameError && <div className="contact--errors" dir="rtl">* צריך לרשום לפנות 4 ספרות בעברית או אנגלית</div>}
            <input type={nameError ? 'text1' : 'text'} placeholder="מה שמך ?" dir="rtl" value={name} onChange={(e) => {setName(e.target.value); setUserHasClicked(prev => ({...prev, name: true}))}} />
          </div>
          <div>
            {bikeError && <div className="contact--errors" dir="rtl">* צריך לרשום את האופנוע שלך</div>}
            <input type={bikeError ? 'text1' : 'text'} placeholder="על מה את/ה רוכב/ת?" dir="rtl" value={bike} onChange={(e) => {setBike(e.target.value); setUserHasClicked(prev => ({...prev, bike: true}))}} />
          </div>
          <div>
            {locationError && <div className="contact--errors" dir="rtl">* צריך לרשום מיקום</div>}
            <input type={locationError ? 'text1' : 'text'} placeholder="מאיפה בארץ ? (עיר \ ישוב)" dir="rtl" value={location} onChange={(e) => {setLocation(e.target.value); setUserHasClicked(prev => ({...prev, location: true}))}} />
          </div>
          <div>
            {instagramError && <div className="contact--errors" dir="rtl">* צריך לרשום את הקישור של אינסטגרם</div>} 
            <input type={instagramError ? 'text1' : 'text'} placeholder="קישור של אינסטגרם" dir="rtl" value={instagram} onChange={(e) => {setInstagram(e.target.value); setUserHasClicked(prev => ({...prev, instagram: true}))}} />
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-whatsapp" onClick={(e) => { if (!validate()) e.preventDefault(); }}>צרו קשר דרך ווטסאפ</a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
