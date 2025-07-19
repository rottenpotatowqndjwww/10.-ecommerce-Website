import React from 'react'
import './Confirm.css'
import NavBar from '../../NavBar/NavBar'
import { Link } from 'react-router-dom'
const Confirm = () => {
  return (
    <div>
      <NavBar />
       <div className="order-success-container">
      <div className="order-success-card">
        <div className="success-icon">🎉</div>
        <h1>Thank You for Your Order!</h1>
        
        <p className="lead-text">
          We’ve received your order and it’s currently being processed.
        </p>

        <p className="waffle-text">
          Your satisfaction is our top priority. Our team is already hard at work preparing your package with the utmost care and attention. We know you're excited — and so are we!
        </p>

        <p className="waffle-text">
          You’ll receive a confirmation email shortly with your order details. Once shipped, we’ll provide tracking information so you can follow your order every step of the way.
        </p>

        <p className="waffle-text">
          Meanwhile, feel free to browse more products or get in touch with our support team if you have any questions. We’re always here to help.
        </p>

        <div className="order-summary">
          <p><strong>Order ID:</strong> #SHB123456</p>
          <p><strong>Estimated Delivery:</strong> Within 3–5 business days</p>
        </div>

        <div className="actions">
          <Link to="/home" className="home-btn">Return to Homepage</Link>
          <Link to="/randomproducts" className="browse-btn">Keep Shopping</Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Confirm
