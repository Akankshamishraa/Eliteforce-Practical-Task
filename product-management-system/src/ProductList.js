import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ name: '', minPrice: '', maxPrice: '' });
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        if (storedProducts && storedProducts.length > 0) {
          setProducts(storedProducts);
        } else {
          
          const response = await fetch('/products.json'); 
          const data = await response.json();
          setProducts(data);
          localStorage.setItem('products', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  

 

  const handleDelete = (id) => {
    setProductIdToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    const updatedProducts = products.filter(product => product.id !== productIdToDelete);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setShowModal(false);
  };

 
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevState => ({ ...prevState, [name]: value }));
    setCurrentPage(1); 
  };

  
  const filteredProducts = products.filter(product => {
    const matchName = product.name.toLowerCase().includes(filter.name.toLowerCase());
    const matchMinPrice = filter.minPrice === '' || product.price >= parseFloat(filter.minPrice);
    const matchMaxPrice = filter.maxPrice === '' || product.price <= parseFloat(filter.maxPrice);
    return matchName && matchMinPrice && matchMaxPrice;
  });

 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <Link to="/add" className="add-product-button">Add New Product</Link>
      <div className="filter-container">
        <input
          type="text"
          name="name"
          placeholder="Filter by name"
          value={filter.name}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filter.minPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filter.maxPrice}
          onChange={handleFilterChange}
        />
      </div>
      <ul className="product-list">
        {currentProducts.map(product => (
          <li key={product.id} className="product-item">
            <span>{product.name}</span> - ${product.price}
            <div className="product-item-buttons">
              <Link to={`/edit/${product.id}`} className="edit-button">Edit</Link>
              <button onClick={() => handleDelete(product.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ProductList;
