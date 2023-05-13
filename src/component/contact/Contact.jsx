import React, { useState } from "react";
import "./contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const whatsappMessage = `שלום שמי ${name}.\n${message}.\nפלאפון שלי הוא ${phone}.\nתודה רבה.`;
  const whatsappLink = `https://wa.me/972526600907?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="contact--body">
      <img src="../../marblebackground2.jpg" alt="" />
      <div className='contact--container'>
        <div className='contact--title'>צרו קשר</div>
        <div className='contact--subtitle'>אם יש לכם שאלות, אל תהססו ליצור איתנו קשר</div>
        <form className='contact-textarea'>
          <input type="text" placeholder="שם" dir="rtl" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="פלאפון" dir="rtl" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <textarea name="" id="" cols="30" rows="10" placeholder="ההודעה שלך" dir="rtl" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
          <button className="contract-button2">שלחו</button>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-whatsapp">צרו קשר דרך ווטסאפ</a>
        </form>
      </div>
    </div>
  );
}

export default Contact;
