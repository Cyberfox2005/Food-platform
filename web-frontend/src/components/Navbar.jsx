import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Rocket, User, Bell, Tag, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const { language, setLanguage, text } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: text.home, path: '/' },
    { name: text.menu, path: '/menu' },
    { name: 'Our Craft', path: '/about' },
    { name: text.offers, path: '/offers' },
    { name: text.locations, path: '/locations' },
    { name: text.contact, path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? 'bg-bg-dark/95 backdrop-blur-xl py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-glow group-hover:rotate-12 transition-transform">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter text-white">GRAVITY<span className="text-brand-primary">GRILL</span></span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`hover:text-white transition-colors py-1 ${location.pathname === link.path ? 'text-brand-primary' : 'text-text-dim'}`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-6 w-px bg-white/10 mx-2"></div>

          <Link to={localStorage.getItem('gravity_token') ? '/profile' : '/auth'} aria-label="Account" className={`p-2 rounded-xl transition-all ${location.pathname === '/profile' || location.pathname === '/auth' ? 'bg-brand-primary text-white' : 'text-text-dim hover:bg-white/5 hover:text-white'}`}>
            <User className="w-5 h-5" />
          </Link>
          <Link to="/profile#notifications" aria-label="Notifications" className="relative p-2 text-text-dim hover:text-white">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-primary" />
          </Link>

          <Link to="/cart" className="relative group p-2 rounded-xl hover:bg-white/5 transition-all">
            <ShoppingCart className="w-5 h-5 text-white group-hover:text-brand-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/menu" className="btn-premium py-2 px-6 text-sm">Order Now</Link>
          <select aria-label="Language" value={language} onChange={event => setLanguage(event.target.value)} className="bg-transparent text-text-dim text-xs border border-white/10 rounded-lg px-2 py-2"><option value="en">EN</option><option value="fr">FR</option><option value="ar">عربي</option></select>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <Link to="/profile" className="text-text-dim">
            <User className="w-6 h-6" />
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <Motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-dark border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg hover:text-brand-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/offers" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 text-text-dim"><Tag className="w-4 h-4" /> Today's offers</Link>
              <Link to="/menu" onClick={() => setIsMenuOpen(false)} className="btn-premium py-4 px-6 text-lg">Order Now</Link>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
