import React, { useState } from 'react'
import './NavBar.css'
import logo from '../../assets/logo.png'
import { ToastContainer, toast } from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom'

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [cartItems] = useState(3);
    const navigate = useNavigate();

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            toast.error("Search field can't be empty!");
            return;
        }
       navigate(`/search/${encodeURIComponent(searchQuery.trim())}`)

       searchQuery('')
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
        const  toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen)
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleCart= () =>{
        confirm("Are You Sure To Purchase Products Included In Carts ???")
        if(confirm){
            navigate('/confirm')
        }
    }

    return (
        <nav className='navbar'>
            <Link to='/' className="navbar-brand">
                <img src={logo} alt="ShopHub Logo" className="logo" />
            </Link>
            
            <div className={`navbar-nav ${isMenuOpen ? 'active' : ''}`}>
                <a href="/home" className='nav-link'>Home</a>
                <a href="/randomproducts" className='nav-link'>Products</a>
                <a href="/about" className='nav-link'>About</a>
                <a href="/about" className='nav-link'>Contact</a>
            </div>
            
            <div className="search-form">
                <input 
                    type="text"
                    placeholder='Search for products...'
                    value={searchQuery}
                    onKeyPress={handleKeyPress}
                    className="search-input"
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch} className='search-btn'>
                    🔍
                </button>
            </div>
            
            <div className="navbar-actions">
                <div className="user-menu">
                    <button className='user-btn'>
                        👤 Account
                    </button>
                </div>
                
                <div className="cart">
                    <button className='cart-btn' onClick={handleCart}>
                        🛒
                        {cartItems > 0 && (
                            <span className="cart-badge">{cartItems}</span>
                        )}
                    </button>
                </div>
                
                <button 
                    className='mobile-menu-btn'
                    onClick={toggleMenu}
                    aria-label='Toggle menu'
                >
                    ☰
                </button>
            </div>
            
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </nav>
    )
}

export default NavBar