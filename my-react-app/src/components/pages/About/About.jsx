import React from 'react';
import './About.css';
import NavBar from '../../NavBar/NavBar.jsx'

const AboutUs = () => {
  return (
    <div>
        <NavBar />
    <div className="about-container">  
      <h1>About ShopHub</h1>
      <section>
        <h2>About Us</h2>
        <p>
          Welcome to ShopHub, your go-to online destination for the best products at unbeatable prices.
          We are passionate about delivering quality, convenience, and innovation to online shoppers.
          Whether you're looking for fashion, electronics, or home essentials — we’ve got you covered.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          We'd love to hear from you! If you have any questions, suggestions, or issues, feel free to reach out:
        </p>
        <ul>
          <li>Email: support@shophub.com</li>
          <li>Phone: +977-9800000000</li>
          <li>Address: 123 Tech Lane, Balkot, Nepal</li>
        </ul>
      </section>

      <section>
        <h2>Privacy Policy</h2>
        <p>
          Your privacy is important to us. We collect and use your personal information only to enhance your
          shopping experience. We do not sell or share your data with third parties. All transactions are encrypted and secure.
        </p>
      </section>

      <section>
        <h2>Terms & Conditions</h2>
        <p>
          By using ShopHub, you agree to our terms. All purchases are subject to product availability and our return policy.
          We reserve the right to modify product prices, descriptions, and policies at any time without prior notice.
        </p>
      </section>

      <section>
        <h2>FAQ</h2>
        <ul>
          <li>
            <strong>Q: How can I track my order?</strong><br />
            A: Once shipped, you'll receive a tracking link via email or SMS.
          </li>
          <li>
            <strong>Q: What is your return policy?</strong><br />
            A: Products can be returned within 7 days of delivery in original condition.
          </li>
          <li>
            <strong>Q: Do you ship internationally?</strong><br />
            A: Currently, we only ship within Nepal, but international shipping will be available soon.
          </li>
        </ul>
      </section>
    </div>
    </div>
  );
};

export default AboutUs;
