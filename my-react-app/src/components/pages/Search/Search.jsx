import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar.jsx'
import './Search.css';

const Search = () => {
    const { productName } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`https://dummyjson.com/products/search?q=${productName}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setProducts(data.products);
                setTotalProducts(data.total);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (productName) {
            fetchSearchResults();
        }
    }, [productName]);

    if (loading) {
        return (
            <div className="search-page search-container">
                <div className="search-loading">
                    <div className="spinner"></div>
                    <p>Searching for "{productName}"...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="search-page search-container">
                <div className="search-error">
                    <h2>Oops! Something went wrong</h2>
                    <p>{error}</p>
                    <Link to="/home" className="back-home-btn">Go Back Home</Link>
                </div>
            </div>
        );
    }

    return (
      <div>
        <NavBar />
        <div className="search-page search-container">
            <div className="search-header">
                <h1>Search Results</h1>
                <div className="search-info">
                    <p className="search-query">Showing results for: <strong>"{productName}"</strong></p>
                    <p className="search-count">
                        {totalProducts > 0 
                            ? `Found ${totalProducts} product${totalProducts !== 1 ? 's' : ''}` 
                            : 'No products found'}
                    </p>
                </div>
            </div>

            {totalProducts === 0 ? (
                <div className="no-results">
                    <div className="no-results-icon">🔍</div>
                    <h3>No products found</h3>
                    <p>Try searching with different keywords or check your spelling.</p>
                    <Link to="/randomproducts" className="browse-all-btn">Browse All Products</Link>
                </div>
            ) : (
                <div className="search-results">
                    <div className="products-grid">
                        {products.map((product) => (
                          
                            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                                <div className="product-image">
                                    <img 
                                        src={product.thumbnail} 
                                        alt={product.title}
                                        loading="lazy"
                                    />
                                </div>
                                
                                <div className="product-info">
                                    <h3 className="product-title">{product.title}</h3>
                                    <p className="product-description">
                                        {product.description.length > 80 
                                            ? `${product.description.substring(0, 80)}...` 
                                            : product.description}
                                    </p>
                                    
                                    <div className="product-price">
                                        ${product.price}
                                    </div>
                                    
                                    <div className="product-bottom">
                                        <div className="product-rating">
                                            <span className="rating-stars">⭐</span>
                                            <span className="rating-value">{product.rating}</span>
                                        </div>
                                        <div className="stock-info">
                                            Stock: {product.stock}
                                        </div>
                                    </div>
                                    
                                    <Link 
                                        to={`/product/${product.id}`} 
                                        className="details-btn"
                                    >
                                        DETAILS
                                    </Link>
                                </div>
                            </Link>
                          
                        ))}
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default Search;
