import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import burgerHero from '../assets/burger_hero.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/menuData';

const Home = () => {
  return (
    <div className="bg-bg-dark text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <Motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left z-10"
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest">
              Out of this world flavor
            </div>
            <h1 className="text-5xl md:text-8xl mb-6 leading-[1.1]">
              The <span className="text-gradient">Celestial</span> <br />
              Burger Experience
            </h1>
            <p className="text-text-dim text-lg md:text-xl mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Elevate your palate with our cosmic creations. Hand-crafted, locally sourced, and seasoned with stardust for a taste that transcends dimensions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/menu" className="btn-premium text-lg">Explore Menu</Link>
              <Link to="/about" className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-all text-lg backdrop-blur-sm text-center">Our Story</Link>
            </div>
          </Motion.div>
          
          <Motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative z-10"
          >
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-brand-primary/20 blur-[120px] rounded-full scale-110"></div>
              <img 
                src={burgerHero} 
                alt="Celestial Burger" 
                className="relative z-10 w-full max-w-lg mx-auto drop-shadow-[0_35px_35px_rgba(170,59,255,0.4)]"
              />
            </div>
          </Motion.div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-secondary/5 blur-[120px] rounded-full"></div>
      </section>

      <section className="py-24 border-y border-white/5 bg-white/[0.015]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-brand-primary uppercase tracking-[0.3em] text-xs font-bold mb-3">The orbit's best</p>
              <h2 className="text-4xl md:text-6xl">Popular <span className="text-gradient">right now.</span></h2>
            </div>
            <Link to="/menu" className="text-sm text-text-dim hover:text-white transition-colors">View the full menu <span className="text-brand-primary">→</span></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {products.slice(0, 3).map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-primary uppercase tracking-[0.3em] text-xs font-bold mb-3">Choose your trajectory</p>
            <h2 className="text-4xl md:text-5xl">Browse by <span className="text-gradient">category.</span></h2>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {categories.filter(category => category.id !== 'all').map(category => (
            <Link key={category.id} to={`/menu?category=${category.id}`} className="min-w-[180px] p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-primary/50 hover:-translate-y-1 transition-all">
              <span className="text-2xl">{category.id === 'mains' ? '🍔' : category.id === 'sides' ? '🍟' : category.id === 'desserts' ? '🍫' : '🥤'}</span>
              <strong className="block mt-8">{category.name}</strong>
              <span className="text-xs text-text-dim">Explore selection →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats/Highlight Section */}
      <section className="py-20 relative border-y border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Prime Cuts', value: '100%' },
            { label: 'Secret Spices', value: '24+' },
            { label: 'Dimensions', value: '11' },
            { label: 'Glowing reviews', value: '5k+' },
          ].map((stat, i) => (
            <Motion.div 
              key={i} 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stat.value}</div>
              <div className="text-text-dim text-sm uppercase tracking-widest">{stat.label}</div>
            </Motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="relative rounded-[4rem] overflow-hidden bg-gradient-to-br from-brand-primary to-brand-secondary p-1">
          <div className="bg-bg-dark rounded-[3.9rem] px-8 py-20 md:py-32 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-primary/5 opacity-50"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <Motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl mb-8 leading-tight"
              >
                Ready for a taste <br /> that's <span className="text-gradient">Legendary</span>?
              </Motion.h2>
              <p className="text-text-dim text-lg mb-12">Join the inner circle and get exclusive early access to our limited-run seasonal drops.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <input 
                  type="email" 
                  placeholder="Enter your galaxy coordinates" 
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-brand-primary transition-all text-center min-w-[300px]"
                />
                <button className="btn-premium w-full sm:w-auto">Engage</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
