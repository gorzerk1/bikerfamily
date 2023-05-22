import React, { useState, useEffect } from "react";
import "./contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [bike, setBike] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState(false);
  const [userHasClicked, setUserHasClicked] = useState({name: false});  

  const whatsappMessage = `שלום שמי ${name}.\nאני גר ב${location}.\nהאופנוע שיש לי הוא ${bike}.\n${message}.`;
  const whatsappLink = `https://wa.me/972549109603?text=${encodeURIComponent(whatsappMessage)}`;

  function validate(){
    const nameRegex = /^[a-zA-Zא-ת\s]{2,}$/;

    let isValid = true;

    if (!nameRegex.test(name)) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
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
    
  }, [name, userHasClicked.name]);

  return (
    <div className="contact--body">
      <img src="../../marblebackground2.jpg" alt="" />
      <div className='contact--container'>
        <div className='contact--title'>צרו קשר</div>
        <div className='contact--subtitle'>אם יש לכם שאלות, אל תהססו ליצור איתנו קשר</div>
        <div className='contact-textarea'>
          <div>
            {nameError && <div className="contact--errors" dir="rtl">* צריך לרשום לפנות 4 ספרות בעברית או אנגלית</div>}
            <input type="text" placeholder="מה שמך ?" dir="rtl" value={name} className={nameError ? 'error' : ''} onChange={(e) => {setName(e.target.value); setUserHasClicked(prev => ({...prev, name: true}))}} />
          </div>
          <div>
            <input type="text" placeholder="על מה את/ה רוכב/ת?" dir="rtl" value={bike} onChange={(e) => setBike(e.target.value)} />
          </div>
          <div>
            <input type="text" placeholder="מאיפה בארץ ? (עיר \ ישוב)" dir="rtl" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-whatsapp" onClick={(e) => { if (!validate()) e.preventDefault(); }}>צרו קשר דרך ווטסאפ</a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
