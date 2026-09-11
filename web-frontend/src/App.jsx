import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import Offers from './pages/Offers';
import Locations from './pages/Locations';
import AdminDashboard from './pages/AdminDashboard';
import Kitchen from './pages/Kitchen';
import Delivery from './pages/Delivery';
import Analytics from './pages/Analytics';
import Team from './pages/Team';
import Auth from './pages/AuthAccount';
import AdminProducts from './pages/AdminProductManager';
import AdminInventory from './pages/AdminInventory';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <CartProvider>
        <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/kitchen" element={<Kitchen />} />
            <Route path="/admin/delivery" element={<Delivery />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/team" element={<Team />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/inventory" element={<AdminInventory />} />
          </Routes>
        </Router>
        </CartProvider>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
