import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="bg-bg-dark min-h-screen text-white">
        <Navbar />
        <div className="container mx-auto px-6 py-48 text-center">
          <Motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <ShoppingBag className="w-20 h-20 text-brand-primary/20 mx-auto mb-8" />
            <h1 className="text-4xl md:text-6xl mb-6 font-display">Your cargo is <span className="text-gradient">empty</span></h1>
            <p className="text-text-dim text-lg mb-12 max-w-md mx-auto">Looks like you haven't added any cosmic fuel to your order yet.</p>
            <Link to="/menu" className="btn-premium py-4 px-12 text-lg">Browse Menu</Link>
          </Motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-bg-dark min-h-screen text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-32">
        <h1 className="text-4xl md:text-6xl mb-12 font-display">Order <span className="text-gradient">Review</span></h1>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode='popLayout'>
              {cartItems.map((item) => (
                <Motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-6"
                >
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                    <p className="text-text-dim text-sm mb-4 line-clamp-1">{item.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-bg-dark rounded-xl p-1 border border-white/5">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white mb-1">${(item.price * item.quantity).toFixed(2)}</div>
                    <div className="text-xs text-text-dim">${item.price} each</div>
                  </div>
                </Motion.div>
              ))}
            </AnimatePresence>
            
            <button 
              onClick={clearCart}
              className="text-text-dim hover:text-white transition-colors text-sm flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Clear All Items
            </button>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sticky top-32">
              <h2 className="text-2xl font-bold mb-8">Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-text-dim">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-dim">
                  <span>Delivery Fee</span>
                  <span>$2.50</span>
                </div>
                <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-white/10">
                  <span>Total</span>
                  <span>${(cartTotal + 2.50).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="btn-premium w-full py-4 flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </button>
                <Link to="/menu" className="block text-center text-sm text-text-dim hover:text-brand-primary transition-colors">
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-8 p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl text-xs text-brand-primary leading-relaxed">
                🚀 Estimated delivery to your galaxy sector: 15-25 mins
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
