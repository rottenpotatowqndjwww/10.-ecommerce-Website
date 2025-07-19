import React, { useEffect, useState } from 'react'
import NavBar from '../../NavBar/NavBar.jsx'
import './RandomProducts.css'
import { Link } from 'react-router-dom'

const RandomProducts = ({ showNavBar = true }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchProducts = async() => {
        try {
            setLoading(true)
            const response = await fetch ('https://dummyjson.com/products')
            const data = await response.json()
            const randomProducts = getRandomProducts(data.products, 40);
            setProducts(randomProducts)
            setLoading(false)
        } catch (error) {
            console.error(error)
        } 
    }
    
    const getRandomProducts = (productList, count) => {
        const shuffled = [...productList].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    useEffect(()=>{
        fetchProducts()

        const interval = setInterval(() => {
            fetchProducts();
        },10000)

        return() => clearInterval(interval);
    },[])
    
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<span key={i} className="star filled">★</span>);
            } else {
                stars.push(<span key={i} className="star">☆</span>);
            }
        }
        return stars;
    };
    
    return (
        <div>
            {showNavBar && <NavBar />}
            <div className="random-products-container">
                <h2 className='section-title'>Products You May Be Interested In</h2>
                <div className="products-grid">
                    {products.map((product) => {
                        return(
                            <Link to={`/product/${product.id}`} key={product.id} className='product-card'>
                                <div className="product-image">
                                    <img src={product.thumbnail} alt="" loading='lazy' />
                                    {product.discountPercentage > 0 && (
                                        <div className="discount-badge">-{Math.round(product.discountPercentage)}%</div>
                                    )}
                                </div>
                                <div className="product-info">
                                    <h3 className="product-title">{product.title}</h3>
                                    <p className='product-description'>
                                        {product.description.length > 60 
                                            ? product.description.substring(0, 60) + '...' 
                                            : product.description}
                                    </p>
                                    <div className="product-price">
                                        <span className='product-price'>${product.price}</span>
                                        {product.discountPercentage > 0 && (
                                            <span className='discount-info'>
                                                <span className="discount-percentage">-{Math.round(product.discountPercentage)}%</span>
                                            </span>
                                        )}
                                        <div className="product-rating">
                                            <div className="stars">
                                                {renderStars(product.rating)}
                                            </div>
                                            <span className="rating-number">{product.rating}</span>
                                        </div>
                                        <div className="product-stock">
                                            Stock: {product.stock}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                {products.length === 0 && !loading && (
                    <div className="no-products">
                        <p>No Products Found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RandomProducts