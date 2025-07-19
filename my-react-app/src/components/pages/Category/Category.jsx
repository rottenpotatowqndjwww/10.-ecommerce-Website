import React, { useEffect, useState } from 'react'
import './Category.css'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import NavBar from '../../../components/NavBar/NavBar.jsx'
import { Link } from 'react-router-dom';

const Category = () => {
    const { categoryName } = useParams()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchCategoryProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://dummyjson.com/products/category/${categoryName}`)
            if (!response.ok) {
                toast.error("Could Not Load Data From Server")
                setError("Failed to fetch products")
                return
            }
            const data = await response.json()
            setProducts(data.products)
            setError(null) // Clear any previous errors
        } catch (error) {
            console.error(error)
            setError(error.message)
            toast.error("Something went wrong while loading products")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (categoryName) {
            fetchCategoryProducts()
        }
    }, [categoryName])

    if (loading) {
        return (
            <div>
                <NavBar />
                <div className="category-container">
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading Products...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <NavBar />
                <div className="category-container">
                    <div className="error">
                        <p>Error loading products: {error}</p>
                        <button onClick={fetchCategoryProducts}>Try Again</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <div className="category-container">
                <div className="category-header">
                    <h1>{categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h1>
                    <p>{products.length} products found</p>
                </div>
                <div className="products-grid">
                    {
                        products.map((product) => (
                            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                                <div className="product-image">
                                    <img 
                                        src={product.thumbnail} 
                                        alt={product.title} 
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
                                        }}
                                    />
                                </div>
                                <div className="product-info">
                                    <h3 className='product-title'>{product.title}</h3>
                                    <p className='product-description'>
                                        {
                                            product.description.length > 100 
                                            ? `${product.description.substring(0, 100)}...` 
                                            : product.description
                                        }
                                    </p>
                                    <div className="product-price">
                                        <span className='current-price'>${product.price}</span>
                                        {product.discountPercentage > 0 && (
                                            <span className='discount'>-{product.discountPercentage}%</span>
                                        )}
                                    </div>
                                    <div className="product-rating">
                                        <span className="rating">⭐ {product.rating}</span>
                                        <span className='stock'>Stock: {product.stock}</span>
                                    </div>
                                    <Link to={`/product/${product.id}`}>
                                        <button className='product-details'>Details</button>
                                    </Link>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                {
                    products.length === 0 && (
                        <div className="no-products">
                            <p>No Products Found Right Now</p>
                        </div>
                    )
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Category