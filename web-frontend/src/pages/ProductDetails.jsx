import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Flame, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import { products } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const ProductDetails = () => {
  const { productId } = useParams();
  const product = products.find(item => String(item.id) === productId);
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [patty, setPatty] = useState('Single');
  const [cheese, setCheese] = useState('None');
  const [sauce, setSauce] = useState('Special sauce');

  if (!product) return <div className="bg-bg-dark min-h-screen text-white"><Navbar /><main className="pt-40 text-center"><h1 className="text-4xl font-display">Dish not found</h1><Link to="/menu" className="btn-premium inline-flex mt-8">Back to menu</Link></main></div>;

  const extras = (patty === 'Double' ? 4 : 0) + (cheese !== 'None' ? 1.5 : 0);
  const total = (product.price + extras) * quantity;
  const isFavorite = favorites.includes(product.id);

  const addConfigured = () => addToCart({ ...product, id: `${product.id}-${patty}-${cheese}-${sauce}`, price: product.price + extras, quantity, customization: { patty, cheese, sauce } });

  return (
    <div className="bg-bg-dark min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-32">
        <Link to="/menu" className="inline-flex items-center gap-2 text-text-dim hover:text-white mb-10"><ArrowLeft className="w-4 h-4" /> Back to menu</Link>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 aspect-square"><img src={product.image} alt={product.name} className="w-full h-full object-cover" /></div>
          <section>
            <div className="flex items-center justify-between gap-4"><div><p className="text-brand-primary uppercase tracking-[0.3em] text-xs font-bold mb-3">Made to order</p><h1 className="text-5xl md:text-6xl font-display">{product.name}</h1></div><button onClick={() => toggleFavorite(product.id)} aria-label="Toggle favorite" className="p-3 rounded-full border border-white/10"> <Heart className={isFavorite ? 'fill-red-500 text-red-500' : 'text-white'} /></button></div>
            <div className="flex items-center gap-2 mt-5 mb-6 text-yellow-500"><Star className="w-4 h-4 fill-current" /> <span className="text-white text-sm">{product.rating} · {product.reviewsCount} reviews</span></div>
            <p className="text-text-dim text-lg leading-relaxed mb-8">{product.description}</p>
            <div className="space-y-6 border-t border-white/10 pt-6">
              <Option label="Patty" value={patty} options={['Single', 'Double']} onChange={setPatty} />
              <Option label="Cheese" value={cheese} options={['None', 'Cheddar', 'Mozzarella']} onChange={setCheese} />
              <Option label="Sauce" value={sauce} options={['Ketchup', 'Mayo', 'Special sauce', 'Spicy sauce']} onChange={setSauce} />
            </div>
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/10"><div><span className="text-text-dim text-sm">Your total</span><div className="text-3xl font-bold text-brand-primary">${total.toFixed(2)}</div></div><div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 flex items-center justify-center"><Minus className="w-4 h-4" /></button><span className="w-6 text-center">{quantity}</span><button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 flex items-center justify-center"><Plus className="w-4 h-4" /></button></div></div>
            <button onClick={addConfigured} className="btn-premium w-full mt-6 flex items-center justify-center gap-3"><ShoppingCart className="w-5 h-5" /> Add customized order</button>
            <div className="flex gap-4 mt-5 text-xs text-text-dim"><span><Check className="inline w-4 h-4 text-brand-primary" /> Fresh preparation</span><span><Flame className="inline w-4 h-4 text-orange-400" /> 15-20 min</span></div>
          </section>
        </div>
      </main>
    </div>
  );
};

const Option = ({ label, value, options, onChange }) => <div><p className="text-sm font-bold mb-3">{label}</p><div className="flex flex-wrap gap-2">{options.map(option => <button key={option} onClick={() => onChange(option)} className={`px-4 py-2 rounded-full border text-sm transition-colors ${value === option ? 'bg-brand-primary border-brand-primary' : 'border-white/10 text-text-dim hover:border-brand-primary/50'}`}>{option}</button>)}</div></div>;

export default ProductDetails;