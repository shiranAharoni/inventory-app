import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [allProducts, setAllProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(''); 
  const [quantity, setQuantity] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); 

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:3001/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const fetchAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3001/product/all');
    setAllProducts(response.data); 
  } catch (error) {
    console.error("Error fetching all products:", error);
  }
  };

  const handleAddClick = () => {
  const qty = parseInt(quantity);

  if (!selectedProduct || isNaN(qty)) {
    alert("Please select a product and enter a valid quantity");
    return;
  }

  if (qty < 0) {
    alert("Quantity cannot be negative");
    return;
  }

  const newItem = {
    name: selectedProduct,
    quantity: qty 
  };

  setInventory([...inventory, newItem]);
  setSelectedProduct('');
  setQuantity('');
  };

  const handleSaveInventory = async () => {
    try {
      const response = await axios.post('http://localhost:3001/inventory', inventory);
      
      if (response.status === 200) {
        alert("Inventory saved successfully!");
      }
    } catch (error) {
      console.error("Error saving inventory:", error);
      alert(error.response?.data?.error || "Failed to save inventory");
    }
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to clear the entire inventory?")) {
      try {
        await axios.post('http://localhost:3001/inventory/reset');
        setInventory([]); 
        alert("Inventory has been reset");
      } catch (error) {
        console.error("Error resetting inventory:", error);
        alert("Failed to reset inventory");
      }
    }
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedInventory = inventory.filter((_, index) => index !== indexToRemove);
    setInventory(updatedInventory);
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    const updatedInventory = [...inventory];
    const val = parseInt(newQuantity);
    updatedInventory[index].quantity = (isNaN(val)|| val < 0) ? 0 : val;
    setInventory(updatedInventory);
  };

useEffect(() => {
  fetchInventory();
  fetchAllProducts(); 
}, []);

  return (
    <div>
      <h1>Inventory Management</h1>
      <Link name="new product" to="/create-product">new product</Link>

      <div className="add-to-inventory-form">
        <h3>Add to Inventory</h3>
        <select 
            value={selectedProduct} 
            onChange={(e) => setSelectedProduct(e.target.value)}
        >
            <option value="">Select a product</option>
            {allProducts.map((product, index) => (
            <option key={index} value={product.name}>
                {product.name}
            </option>
            ))}
        </select>

        <input 
            type="number" 
            placeholder="quantity" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
        />

        <button onClick={handleAddClick}>+</button>
        </div>
      
      <table>
        <thead>
            <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Action</th> 
            </tr>
        </thead>
        <tbody>
            {inventory.map((item, index) => (
                <tr key={index}>
                <td>{item.name}</td>
                <td>
                    {editingIndex === index ? (
                    <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => handleUpdateQuantity(index, e.target.value)}
                        min="0"
                    />
                    ) : (
                    item.quantity
                    )}
                </td>
                <td>
                    {editingIndex === index ? (
                    <button onClick={() => setEditingIndex(null)}>V</button>
                    ) : (
                    <>
                        <button onClick={() => setEditingIndex(index)}>Edit</button>
                        <button onClick={() => handleRemoveItem(index)}>x</button>
                    </>
                    )}
                </td>
                </tr>
            ))}
        </tbody>
      </table>
      {inventory.length === 0 && <p>Inventory is currently empty</p>}

      <div className="actions-container">
        <button onClick={handleSaveInventory} className="save-btn">
            Save Inventory
        </button>
        
        <button onClick={handleReset} className="reset-btn" >
            Reset Inventory
        </button>
      </div>
    </div>
  );
}

export default InventoryPage;