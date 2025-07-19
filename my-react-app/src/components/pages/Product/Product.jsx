import React, { useEffect, useState } from 'react'
import './Product.css'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import NavBar from '../../../components/NavBar/NavBar.jsx'
import { Link } from 'react-router-dom'

const Product = () => {
    const { productId } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const fetchProduct = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://dummyjson.com/products/${productId}`)
            if (!response.ok) {
                toast.error("Product not found")
                setError("Failed to fetch product")
                return
            }
            const data = await response.json()
            setProduct(data)
            setError(null)
        } catch (error) {
            console.error(error)
            setError(error.message)
            toast.error("Something went wrong while loading product")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (productId) {
            fetchProduct()
        }
    }, [productId])

    const handleQuantityChange = (type) => {
        if (type === 'increase' && quantity < product.stock) {
            setQuantity(prev => prev + 1)
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const handleAddToCart = () => {
        toast.success(`Added ${quantity} ${product.title}(s) to cart!`)
    }

    const handleBuyNow = () => {
        toast.info("Redirecting to checkout...")
        navigate('/confirm')
    }

    const calculateDiscountedPrice = () => {
        if (product.discountPercentage > 0) {
            return (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
        }
        return product.price
    }

    const formatCategory = (category) => {
        return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }

    if (loading) {
        return (
            <div>
                <NavBar />
                <div className="product-container">
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading Product Details...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <NavBar />
                <div className="product-container">
                    <div className="error">
                        <p>Error loading product: {error}</p>
                        <button onClick={fetchProduct}>Try Again</button>
                        <button onClick={() => navigate(-1)}>Go Back</button>
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div>
                <NavBar />
                <div className="product-container">
                    <div className="not-found">
                        <h2>Product Not Found</h2>
                        <p>The product you're looking for doesn't exist.</p>
                        <button onClick={() => navigate(-1)}>Go Back</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <div className="product-container">
                {/* Breadcrumb Navigation */}
                <div className="breadcrumb">
                    <Link to="/home">Home</Link>
                    <span> / </span>
                    <Link to={`/category/${product.category}`}>
                        {formatCategory(product.category)}
                    </Link>
                    <span> / </span>
                    <span>{product.title}</span>
                </div>

                <div className="product-details">
                    {/* Product Images Section */}
                    <div className="product-images">
                        <div className="main-image">
                            <img 
                                src={product.images[selectedImage]} 
                                alt={product.title}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/500x400?text=No+Image'
                                }}
                            />
                        </div>
                        <div className="image-thumbnails">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${product.title} ${index + 1}`}
                                    className={selectedImage === index ? 'active' : ''}
                                    onClick={() => setSelectedImage(index)}
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/100x80?text=No+Image'
                                    }}
                                    
                                />
                            ))}
                        </div>
                    </div>

                    {/* Product Information Section */}
                    <div className="product-info">
                        <div className="product-header">
                            <h1 className="product-title">{product.title}</h1>
                            <div className="product-brand">
                                <span>Brand: {product.brand}</span>
                            </div>
                        </div>

                        <div className="product-rating">
                            <div className="rating-stars">
                                {[...Array(5)].map((_, index) => (
                                    <span 
                                        key={index} 
                                        className={index < Math.floor(product.rating) ? 'star filled' : 'star'}
                                    >
                                        ⭐
                                    </span>
                                ))}
                                <span className="rating-number">({product.rating})</span>
                            </div>
                        </div>

                        <div className="product-pricing">
                            {product.discountPercentage > 0 ? (
                                <div className="pricing-with-discount">
                                    <span className="discounted-price">${calculateDiscountedPrice()}</span>
                                    <span className="original-price">${product.price}</span>
                                    <span className="discount-badge">-{product.discountPercentage}% OFF</span>
                                </div>
                            ) : (
                                <span className="price">${product.price}</span>
                            )}
                        </div>

                        <div className="product-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="product-specifications">
                            <h3>Product Details</h3>
                            <div className="specs-grid">
                                <div className="spec-item">
                                    <span className="spec-label">Category:</span>
                                    <span className="spec-value">{formatCategory(product.category)}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Stock:</span>
                                    <span className={`spec-value ${product.stock < 10 ? 'low-stock' : ''}`}>
                                        {product.stock} units available
                                    </span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">SKU:</span>
                                    <span className="spec-value">{product.sku}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Weight:</span>
                                    <span className="spec-value">{product.weight} kg</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Dimensions:</span>
                                    <span className="spec-value">
                                        {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                                    </span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Warranty:</span>
                                    <span className="spec-value">{product.warrantyInformation}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Shipping:</span>
                                    <span className="spec-value">{product.shippingInformation}</span>
                                </div>
                                <div className="spec-item">
                                    <span className="spec-label">Return Policy:</span>
                                    <span className="spec-value">{product.returnPolicy}</span>
                                </div>
                            </div>
                        </div>

                        <div className="product-actions">
                            <div className="quantity-selector">
                                <label>Quantity:</label>
                                <div className="quantity-controls">
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange('decrease')}
                                        disabled={quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{quantity}</span>
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => handleQuantityChange('increase')}
                                        disabled={quantity >= product.stock}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button 
                                    className="add-to-cart-btn"
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                >
                                    Add to Cart
                                </button>
                                <button 
                                    className="buy-now-btn"
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}
                                >
                                    Buy Now
                                </button>
                            </div>

                            {product.stock === 0 && (
                                <div className="out-of-stock">
                                    <p>This product is currently out of stock</p>
                                </div>
                            )}
                        </div>

                        {/* Product Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="product-tags">
                                <h3>Tags</h3>
                                <div className="tags-list">
                                    {product.tags.map((tag, index) => (
                                        <span key={index} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Reviews Section */}
                {product.reviews && product.reviews.length > 0 && (
                    <div className="product-reviews">
                        <h2>Customer Reviews</h2>
                        <div className="reviews-list">
                            {product.reviews.map((review, index) => (
                                <div key={index} className="review-item">
                                    <div className="review-header">
                                        <span className="reviewer-name">{review.reviewerName}</span>
                                        <div className="review-rating">
                                            {[...Array(5)].map((_, starIndex) => (
                                                <span 
                                                    key={starIndex}
                                                    className={starIndex < review.rating ? 'star filled' : 'star'}
                                                >
                                                    ⭐
                                                </span>
                                            ))}
                                        </div>
                                        <span className="review-date">
                                            {new Date(review.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default Product