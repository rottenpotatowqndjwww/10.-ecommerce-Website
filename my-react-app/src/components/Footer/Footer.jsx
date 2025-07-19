import React from 'react'
import facebook from '../../assets/facebook_icon.png'
import instagram from '../../assets/instagram_icon.png'
import twitter from '../../assets/twitter_icon.png'
import youtube from '../../assets/youtube_icon.png'
import {Link} from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-description">
          <h2>© 2025 ShopHub. All rights reserved.</h2>
          <h4>🌐 Powered by Dummy JSON</h4>
        </div>

        <div className="footer-links">
          <h2>Quick Links:</h2>
          <ul>
            <li><a href='/home' className='quick-links'>Home</a></li>
            <li><Link to='/about' className='quick-links'>About Us</Link></li>
            <li><Link to='/about' className='quick-links'>Contact</Link></li>
            <li><Link to='/about' className='quick-links'>Privacy Policy</Link></li>
            <li><Link to='/about' className='quick-links'>Terms & Conditions</Link></li>
            <li><Link to='/about' className='quick-links'>FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <h2>Follow Us</h2>
          <a href='https://www.facebook.com'><img src={facebook} alt="Facebook" /></a> 
          <a href="https://www.instagram.com"><img src={instagram} alt="Instagram" /></a>
          <a href="https://www.x.com"><img src={twitter} alt="Twitter" /></a>
          <a href="https://www.youtube.com"><img src={youtube} alt="YouTube" /></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer