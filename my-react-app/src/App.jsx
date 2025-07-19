import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InterFace from './components/InterFace/InterFace.jsx';
import Footer from './components/Footer/Footer.jsx'
import Home from './components/pages/Home/Home.jsx'
import Category from './components/pages/Category/Category.jsx';
import Products from './components/pages/Product/Product.jsx'
import About from './components/pages/About/About.jsx';
import RandomProducts  from './components/pages/RandomProducts/RandomProducts.jsx';
import Search from './components/pages/Search/Search.jsx';
import Confirm from './components/pages/Confirm/Confirm.jsx'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<InterFace />} />
        <Route path='/home'element={<Home />} />
        <Route path='/category/:categoryName' element={<Category />} />
        <Route path='/product/:productId'   element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/randomproducts' element={<RandomProducts />} />
        <Route path='/search/:productName' element={<Search />} />
        <Route path='/confirm'element={<Confirm />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
