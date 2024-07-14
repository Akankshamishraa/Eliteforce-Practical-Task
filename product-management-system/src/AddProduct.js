import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProduct.css'; 
const AddProduct = () => {
  const [product, setProduct] = useState({ id: Date.now(), name: '', description: '', price: '', category: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    storedProducts.push(product);
    localStorage.setItem('products', JSON.stringify(storedProducts));
    navigate('/');
  };

  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit} className="add-product-form">
        <h1>Add Product</h1>
        <input name="name" placeholder="Name" value={product.name} onChange={handleChange} />
        <input name="description" placeholder="Description" value={product.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} />
        <input name="category" placeholder="Category" value={product.category} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddProduct;
