import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const productToEdit = storedProducts.find(p => p.id === parseInt(id));
        if (productToEdit) {
          setProduct(productToEdit);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (!product.name || !product.description || !product.price || !product.category) {
      alert('Please fill in all fields');
      return;
    }

    if (isNaN(parseFloat(product.price))) {
      alert('Price must be a valid number');
      return;
    }

    
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = storedProducts.map(p =>
      p.id === parseInt(id) ? product : p
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    navigate('/');
  };

  return (
    <div className="edit-product-container">
      <form onSubmit={handleSubmit} className="edit-product-form">
        <h1>Edit Product</h1>
        <input name="name" placeholder="Name" value={product.name} onChange={handleChange} />
        <input name="description" placeholder="Description" value={product.description} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={product.price} onChange={handleChange} />
        <input name="category" placeholder="Category" value={product.category} onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditProduct;
