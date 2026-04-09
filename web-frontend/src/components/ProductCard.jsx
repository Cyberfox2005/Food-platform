import { ShoppingCart, Flame, Leaf, WheatOff, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { motion as Motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useUser();
  const isFavorite = favorites.includes(product.id);

  const getDietaryIcon = (tag) => {
    switch (tag) {
      case 'Spicy': return <Flame className="w-4 h-4 text-orange-500" />;
      case 'Vegetarian': return <Leaf className="w-4 h-4 text-green-500" />;
      case 'Gluten-Free': return <WheatOff className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <Motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="premium-card group"
    >
      <div className="mb-6 h-64 overflow-hidden rounded-2xl bg-white/5 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Floating Icons */}
        <div className="absolute top-4 left-4 flex gap-2">
          {product.dietary.map(tag => (
            <div key={tag} className="bg-bg-dark/80 backdrop-blur-md p-2 rounded-lg border border-white/10 shadow-lg">
              {getDietaryIcon(tag)}
            </div>
          ))}
        </div>

        <button 
          onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
          className="absolute top-4 right-4 bg-bg-dark/80 backdrop-blur-md p-2.5 rounded-full border border-white/10 shadow-lg hover:scale-110 transition-transform"
        >
          <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <button 
            onClick={() => addToCart(product)}
            className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Order
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-2xl font-display">{product.name}</h3>
        <span className="text-brand-primary font-bold text-xl">${product.price}</span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-white/20'}`} />
          ))}
        </div>
        <span className="text-[10px] text-text-dim font-bold uppercase tracking-widest">{product.rating} ({product.reviewsCount} reviews)</span>
      </div>

      <p className="text-text-dim text-sm leading-relaxed mb-6 line-clamp-2">{product.description}</p>
      
      <button 
        onClick={() => addToCart(product)}
        className="w-full py-3 rounded-xl border border-white/10 hover:border-brand-primary/50 hover:bg-brand-primary/10 transition-all text-sm font-semibold md:hidden"
      >
        Add to Order
      </button>
    </Motion.div>
  );
};

export default ProductCard;
