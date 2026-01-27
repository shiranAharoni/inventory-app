import { useState, useEffect } from 'react'; 
import axios from 'axios';

function CreateProductPage() {
  const [name, setName] = useState('');
  const [allProducts, setAllProducts] = useState([]); 

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/product/all');
      setAllProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSave = async () => {
    if (!name) {
      alert("Please enter a product name");
      return;
    }

    try {
      await axios.put('http://localhost:3001/product', { name: name });
      alert('Product created successfully!');
      setName('');
      fetchAllProducts();

    } catch (error) {
      console.error("Error creating product:", error);
      alert(error.response?.data?.error || "Failed to create product");
    }
  };

  const handleDeleteProduct = async (productName) => {
    if (window.confirm(`Are you sure you want to delete ${productName}?`)) {
      try {
        await axios.delete(`http://localhost:3001/product/${productName}`);
        fetchAllProducts(); 
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

    useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="create-product-container">
      <h2>Create New Product</h2>
      
      <div className="form-group">
        <input 
          type="text" 
          placeholder="product name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

      <button onClick={handleSave} className="save-btn">
        save
      </button>
      
      <hr /> 

      <div className="products-list-section">
        <h3>Existing Products</h3>
        <ul>
          {allProducts.map((product, index) => (
            <li key={index} style={{ marginBottom: '10px', listStyle: 'none' }}>
              {product.name}
              <button 
                onClick={() => handleDeleteProduct(product.name)}
                style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreateProductPage;