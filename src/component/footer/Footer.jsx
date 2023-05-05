import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="footer--body">
          <div className="footer--container">
      <div className="footer--address">
        <h3>Address</h3>
        <div>
          <img src="../../pin.png" alt="" />
          <p>123 Street, City, Country</p>
        </div>
      </div>
      <div className="footer--contact">
        <h3>Contact</h3>
        <div>
          <img src="../../mailIcon.png" alt="Email" />
          <p> example@example.com</p>
        </div>
        <div>
          <img src="../../phoneIcon.png" alt="Phone" />
          <p> 05240502402</p>
        </div>
      </div>
      <div className="footer--follow-us">
        <h3>Follow Us</h3>
        <div>
          <img src="../../facebook.png" alt="Facebook" />
          <p> family.bikers.il</p>
        </div>
        <div>
          <img src="../../instagram.png" alt="Instagram" />
          <p> family.bikers.il</p>
        </div>
        <div>
          <img src="../../twitter.png" alt="Twitter" />
          <p> family.bikers.il</p>
        </div>
      </div>
    </div>
    <div className="footer--container2">
      <div>זכויות יוצרים © 2023 יונתן. כל הזכויות שמורות.</div>
      <div className="dima">Built by Dima</div>
    </div>
    </div>
  );
}

export default Footer;
