import { useState, useEffect } from 'react';
import { Search, Sparkles, ArrowUpDown } from 'lucide-react';
import { categories, products as localProducts } from '../data/menuData';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setProducts(localProducts);
        setLoading(false);
      });
  }, []);

  const dietaryOptions = ['Vegetarian', 'Spicy', 'Gluten-Free'];

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesFilters = activeFilters.every(f => product.dietary.includes(f));
    
    return matchesSearch && matchesCategory && matchesFilters;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount;
  });

  return (
    <div className="bg-bg-dark min-h-screen text-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-primary/10 to-transparent">
        <div className="container mx-auto px-6 text-center">
          <Motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl mb-6 font-display"
          >
            Digital <span className="text-gradient">Menu</span>
          </Motion.h1>
          <p className="text-text-dim max-w-2xl mx-auto mb-12">
            Explore our curated selection of cosmic creations. Each dish is engineered for maximum flavor and zero-G satisfaction.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-12">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-dim w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for your favorite star-dish..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-14 pr-6 focus:outline-none focus:border-brand-primary transition-all text-lg"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-8 py-3 rounded-full transition-all text-sm font-semibold border ${
                  activeCategory === cat.id 
                    ? 'bg-brand-primary border-brand-primary text-white shadow-glow' 
                    : 'bg-white/5 border-white/10 text-text-dim hover:border-brand-primary/50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Dietary Filters */}
          <div className="flex justify-center gap-6">
            {dietaryOptions.map(option => (
              <label key={option} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={activeFilters.includes(option)}
                  onChange={() => toggleFilter(option)}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                  activeFilters.includes(option) ? 'bg-brand-primary border-brand-primary' : 'border-white/20 group-hover:border-brand-primary/50'
                }`}>
                  {activeFilters.includes(option) && <Sparkles className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm transition-colors ${activeFilters.includes(option) ? 'text-white' : 'text-text-dim'}`}>
                  {option}
                </span>
              </label>
            ))}
          </div>

          <label className="mt-8 inline-flex items-center gap-3 text-sm text-text-dim">
            <ArrowUpDown className="w-4 h-4 text-brand-primary" />
            <span>Sort menu</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-bg-dark border border-white/10 rounded-full px-4 py-2 text-white focus:outline-none focus:border-brand-primary">
              <option value="recommended">Recommended</option>
              <option value="rating">Top rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32 container mx-auto px-6">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-text-dim">Consulting the star charts...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <Motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </Motion.div>
        ) : (
          <div className="py-20 text-center">
            <div className="text-6xl mb-6 opacity-20 text-brand-primary">🛸</div>
            <h3 className="text-2xl text-white mb-2">No signal found</h3>
            <p className="text-text-dim text-lg">Try searching for another coordinate or specialty.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Menu;
