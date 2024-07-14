import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
