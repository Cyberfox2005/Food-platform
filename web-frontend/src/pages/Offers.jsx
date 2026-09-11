import { Clock, Gift, Percent, ShoppingCart, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { products } from '../data/menuData';

const offers = [
  { title: 'Orbit Lunch Drop', detail: 'Save 20% on any main course before 3 PM.', label: '20% OFF', icon: Percent, tone: 'from-brand-primary/30' },
  { title: 'Free-fall Combo', detail: 'Galactic Classic, Comet Fries, and a Nebula Milkshake.', label: '$24 COMBO', icon: Gift, tone: 'from-orange-500/20' },
  { title: 'Zero-G Delivery', detail: 'Free delivery on orders over $35 this week.', label: 'FREE DELIVERY', icon: Sparkles, tone: 'from-cyan-500/20' },
];

const Offers = () => {
  const { addToCart } = useCart();
  const comboItems = products.filter(product => [3, 5, 7].includes(product.id));
  const addCombo = () => addToCart({ ...comboItems[0], id: 'free-fall-combo', name: 'Free-fall Combo', description: 'Burger, fries, and shake in one perfect orbit.', price: 24, quantity: 1 });

  return <div className="bg-bg-dark min-h-screen text-white"><Navbar /><main className="container mx-auto px-6 pt-36 pb-32"><div className="max-w-3xl mb-16"><p className="text-brand-primary uppercase tracking-[0.3em] text-xs font-bold mb-4">Limited transmissions</p><h1 className="text-5xl md:text-7xl font-display mb-6">Good things come in <span className="text-gradient">orbits.</span></h1><p className="text-text-dim text-lg">Seasonal drops, generous combos, and rewards for making Gravity Grill part of your routine.</p></div><div className="grid lg:grid-cols-3 gap-6 mb-20">{offers.map(({ title, detail, label, icon: Icon, tone }) => <article key={title} className={`rounded-3xl border border-white/10 bg-gradient-to-br ${tone} to-white/[0.03] p-7 min-h-[270px] flex flex-col`}><Icon className="text-brand-primary w-8 h-8 mb-auto" /><span className="text-xs font-bold tracking-[0.2em] text-brand-primary">{label}</span><h2 className="text-2xl font-display mt-3 mb-2">{title}</h2><p className="text-text-dim text-sm">{detail}</p></article>)}</div><section className="grid lg:grid-cols-[1fr_360px] gap-10 items-start"><div><p className="text-brand-primary uppercase tracking-[0.3em] text-xs font-bold mb-3">Featured combo</p><h2 className="text-4xl font-display mb-8">Built for <span className="text-gradient">sharing.</span></h2><div className="grid sm:grid-cols-3 gap-4">{comboItems.map(product => <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl p-3"><img src={product.image} alt={product.name} className="aspect-square object-cover rounded-xl" /><p className="font-bold mt-3">{product.name}</p><p className="text-text-dim text-sm">${product.price}</p></div>)}</div></div><aside className="bg-white/5 border border-white/10 rounded-3xl p-7"><Clock className="text-brand-primary mb-5" /><h3 className="text-2xl font-display mb-3">Free-fall Combo</h3><p className="text-text-dim mb-6">Save $7 when you bundle the whole crew.</p><div className="flex justify-between mb-6"><span className="line-through text-text-dim">$31</span><strong className="text-2xl text-brand-primary">$24</strong></div><button onClick={addCombo} className="btn-premium w-full flex items-center justify-center gap-2"><ShoppingCart className="w-4 h-4" /> Add combo</button></aside></section></main><Footer /></div>;
};

export default Offers;