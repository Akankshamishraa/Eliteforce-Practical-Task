import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ id: '', name: '', description: '', price: '', category: '' });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    // setProducts(storedProducts);
    const productToEdit = storedProducts.find(p => p.id === parseInt(id));
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      console.error('Product not found');
    }
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
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = storedProducts.map(p =>
      p.id === parseInt(id) ? product : p
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="edit-product-form">
      <h1>Edit Product</h1>
      <input
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={product.category}
        onChange={handleChange}
        required
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditProduct;