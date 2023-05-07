import React from "react";
import "./contact.css";


function Contact() {
  return (
    <div className="contact--body">
      <img src="../../marblebackground2.jpg" alt="" />
      <div className='contact--container'>
        <div className='contact--title'>צרו קשר</div>
        <div className='contact--subtitle'>אם יש לכם שאלות, אל תהססו ליצור איתנו קשר</div>
        <div className='contact-textarea'>
          <input type="text" placeholder="שם" dir="rtl" />
          <input type="text" placeholder="פלאפון" dir="rtl" />
          <textarea name="" id="" cols="30" rows="10" placeholder="ההודעה שלך" dir="rtl"></textarea>
        </div>
        <button className="contract-button2">שלחו</button>
        <div className="contact-whatsapp">
          <button>צרו קשר דרך ווטסאפ</button>
        </div>
        
      </div>
    </div>
  );
}

export default Contact;