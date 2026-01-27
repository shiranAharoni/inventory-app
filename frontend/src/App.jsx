import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';
import CreateProductPage from './pages/CreateProductPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<InventoryPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;