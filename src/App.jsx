import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VendorProductPage from './pages/VendorProductPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>테스트</h1>} />
        <Route path="/product/add" element={<VendorProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
