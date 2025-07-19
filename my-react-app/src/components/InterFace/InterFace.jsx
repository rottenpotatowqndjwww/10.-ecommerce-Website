import React, { useState } from 'react'
import './Interface.css'
import search from '../../assets/search.png'
import logo from '../../assets/logo.svg'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Interface = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () =>{
 if (!searchQuery.trim()) {
            toast.error("Search field can't be empty!");
            return;
        }
        navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery('');
  }
  const handleKeyPress= (e) => {
    if(e.key === 'Enter'){
      handleSearch()
    }
  }


  return ( 
    <main className='interface-container'>
      <div className="introduction">
        <img src={logo} alt="ShopHub Logo" className="logo" />
        <h1><span>Welcome to ShopHub</span></h1>
        <p className="tagline">Products That Will Make You Come.....</p>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Search for products..."
         value={searchQuery}
         onKeyPress={handleKeyPress}
         onChange={(e)=> setSearchQuery(e.target.value)}
         />
        <button className="search-btn"
        onClick={handleKeyPress}>
          <img src={search} alt="Search Icon" />
        </button>
      </div>

      <Link to='/home' className="cta">
        <button className="view-site-btn">View Full Website</button>
      </Link>

      <div className="homepage-description">
        <p>
          Welcome to <strong>ShopHub</strong>, the ultimate destination for all your shopping needs. 
          Whether you're looking for the latest fashion, cutting-edge electronics, home essentials, 
          or lifestyle accessories, ShopHub brings everything under one virtual roof.
        </p>
        <p>
          With a user-friendly interface, secure checkout, fast delivery, and 24/7 customer support, 
          ShopHub makes online shopping seamless and enjoyable.
        </p>
        <ul>
          <li>🔍 Powerful search and filter tools</li>
          <li>🛒 Smart cart and wishlist management</li>
          <li>💳 Multiple secure payment options</li>
          <li>📦 Real-time order tracking</li>
          <li>⭐ Verified product reviews</li>
          <li>🎁 Daily deals and exclusive offers</li>
        </ul>
        <p>
          Join thousands of satisfied customers and experience the future of shopping with ShopHub — 
          where quality meets convenience.
        </p>
      </div>
      <ToastContainer />
    </main>
  )
}

export default Interface