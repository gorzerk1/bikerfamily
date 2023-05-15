import React, { useState, useEffect } from "react";
import "./contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [nameType, setNameType] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [userHasClicked, setUserHasClicked] = useState({name: false, phone: false});  

  const whatsappMessage = `שלום שמי ${name}.\n${message}.\nפלאפון שלי הוא ${phone}.\nתודה רבה.`;
  const whatsappLink = `https://wa.me/972526600907?text=${encodeURIComponent(whatsappMessage)}`;

  function validate(){
    const nameRegex = /^[a-zA-Z\s]{4,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const validPhonePrefixes = ['050', '052', '053', '054', '055', '056', '058'];

    let isValid = true;

    if (!nameRegex.test(name)) {
      setNameType("text1");
      isValid = false;
    } else {
      setNameType("text");
    }

    if (!phoneRegex.test(phone) || !validPhonePrefixes.includes(phone.substring(0, 3))) {
      setPhoneType("text1");
      isValid = false;
    } else {
      setPhoneType("text");
    }

    return isValid;
  }


  useEffect(() => {
    const nameRegex = /^[a-zA-Zא-ת\s]{4,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const validPhonePrefixes = ['050', '052', '053', '054', '055', '056', '058'];
  
    if (!nameRegex.test(name) && userHasClicked.name) {
      setNameType("text1");
    } else {
      setNameType("text");
    }
    
    if ((!phoneRegex.test(phone) || !validPhonePrefixes.includes(phone.substring(0, 3))) && userHasClicked.phone) {
      setPhoneType("text1");
    } else {
      setPhoneType("text");
    }
    
  }, [name, phone, userHasClicked.name, userHasClicked.phone]);
  

  return (
    <div className="contact--body">
      <img src="../../marblebackground2.jpg" alt="" />
      <div className='contact--container'>
        <div className='contact--title'>צרו קשר</div>
        <div className='contact--subtitle'>אם יש לכם שאלות, אל תהססו ליצור איתנו קשר</div>
        <div className='contact-textarea'>
          <div>
            {nameType === 'text1' && <div className="contact--errors" dir="rtl">* צריך לרשום לפנות 4 ספרות בעברית או אנגלית</div>}
            <input type={nameType} placeholder="שם" dir="rtl" value={name} onChange={(e) => {setName(e.target.value); setUserHasClicked(prev => ({...prev, name: true}))}} />
          </div>
          <div>
            {phoneType === 'text1' && <div className="contact--errors" dir="rtl">* תרשום קידומת נכונה ורק מספרים</div>}
            <input type={phoneType} placeholder="פלאפון" dir="rtl" value={phone} onChange={(e) => {setPhone(e.target.value); setUserHasClicked(prev => ({...prev, phone: true}))}} />
          </div>
          <textarea name="" id="" cols="30" rows="10" placeholder="ההודעה שלך" dir="rtl" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-whatsapp" onClick={(e) => { if (!validate()) e.preventDefault(); }}>צרו קשר דרך ווטסאפ</a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
