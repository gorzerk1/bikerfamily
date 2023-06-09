import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="footer--body">
      <div className="footer--container">
        <div className="footer--logos">
          <img src="../../bikerlogo.png" alt="" />
          <img src="../../getaway.png" alt="" />
        </div>
        <div className="footer--contact" dir="rtl">
          <h3>צרו קשר</h3>
          <div>
            <img src="../../mailIcon.png" alt="Email" />
            <a href="https://www.instagram.com/family.bikers.il"> bikerfamily@gmail.com</a>
          </div>
        </div>
        <div className="footer--follow-us" dir="rtl">
        <h3>עקבו אחרינו</h3>
        <div>
          <img src="../../instagram.png" alt="Instagram" />
          <a href="https://www.instagram.com/family.bikers.il">family.bikers.il</a>
        </div>
        <div>
          <img src="../../instagram.png" alt="Instagram" />
          <a href="https://www.instagram.com/ridersgetaway">RidersGetaway</a>
        </div>
      </div>
    </div>
    <div className="footer--container2">
      <div dir="rtl">זכויות יוצרים © 2023 יונתן. כל הזכויות שמורות.</div>
      <a href="https://dimadubinin.com" className="dima" >Built by Dima</a>
    </div>
    </div>
  );
}

export default Footer;
