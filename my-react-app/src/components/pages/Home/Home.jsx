import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import NavBar from '../../NavBar/NavBar.jsx'
import bestprice from '../../../assets/thumbnail.jpg'
import RandomProducts from '../RandomProducts/RandomProducts.jsx'

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHomeData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/category-list')
      const data = await response.json()
      setCategories(data.slice(0, 20))
    }
    catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHomeData()
  }, [])

  const categoryIcons = {
    'beauty': '💄',
    'fragrances': '🌸',
    'furniture': '🪑',
    'groceries': '🛒',
    'home-decoration': '🏠',
    'kitchen-accessories': '🍳',
    'laptops': '💻',
    'mens-shirts': '👔',
    'mens-shoes': '👞',
    'mens-watches': '⌚',
    'mobile-accessories': '📱',
    'motorcycle': '🏍️',
    'skin-care': '🧴',
    'smartphones': '📱',
    'sports-accessories': '⚽',
    'sunglasses': '🕶️',
    'tablets': '📱',
    'tops': '👕',
    'vehicle': '🚗',
    'womens-bags': '👜',
    'womens-dresses': '👗',
    'womens-jewellery': '💎',
    'womens-shoes': '👠',
    'womens-watches': '⌚'
  };

  // No need for handleCategoryClick since we're using Link

  return (
    <div>
      <NavBar />

      <div className="hero-banner">
        <div className="banner-container">
          <img 
            src={bestprice} 
            alt="Lowest Prices Guaranteed - Special Offer" 
            className="banner-image"
          />
        </div>
      </div>
      
      <div className="home-content">
        <div className="categories">
          <h2>Browse By Categories</h2>
          <div className="categories-grid">
            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : (
              categories.map((item, index) => (
                <Link 
                  key={index} 
                  to={`/category/${item}`}
                  className="categories-card-link"
                >
                  <div className="categories-card">
                    <div className="category-icon">
                      {categoryIcons[item] || '📦'}
                    </div>
                    <span>{item.replace(/-/g, ' ')}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <RandomProducts showNavBar={false} />
    </div>
  )
}

export default Home