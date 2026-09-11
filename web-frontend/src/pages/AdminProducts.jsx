import { useState } from 'react';
import { ArrowLeft, Edit3, PackagePlus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products as initialProducts } from '../data/menuData';

const blankProduct = { name: '', description: '', price: '', category: 'mains', availability: true };

const AdminProducts = () => {
  const [items, setItems] = useState(initialProducts.map(item => ({ ...item, availability: true })));
  const [form, setForm] = useState(blankProduct);
  const [editingId, setEditingId] = useState(null);

  const save = event => {
    event.preventDefault();
    if (!form.name || !form.price) return;
    if (editingId) setItems(prev => prev.map(item => item.id === editingId ? { ...item, ...form, price: Number(form.price) } : item));
    else setItems(prev => [...prev, { ...form, id: Date.now(), price: Number(form.price), image: initialProducts[0].image, dietary: [], rating: 0, reviewsCount: 0 }]);
    setForm(blankProduct);
    setEditingId(null);
  };

  const edit = item => { setEditingId(item.id); setForm({ name: item.name, description: item.description, price: item.price, category: item.category, availability: item.availability }); };

  return <div className="min-h-screen bg-[#0b0d12] text-white"><header className="border-b border-white/10 px-6 lg:px-10 py-5 flex items-center gap-4"><Link to="/admin" className="p-2 rounded-lg hover:bg-white/5"><ArrowLeft className="w-5 h-5" /></Link><div><p className="text-xs uppercase tracking-[0.25em] text-brand-primary">Gravity Ops</p><h1 className="text-2xl font-display">Product management</h1></div></header><main className="p-6 lg:p-10 max-w-7xl mx-auto grid xl:grid-cols-[1fr_360px] gap-8 items-start"><section className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden"><div className="p-6 flex items-center justify-between"><div><h2 className="text-xl font-bold">Menu catalog</h2><p className="text-sm text-text-dim">{items.length} products configured</p></div><PackagePlus className="text-brand-primary" /></div><div className="divide-y divide-white/10">{items.map(item => <div key={item.id} className="p-5 flex flex-wrap items-center gap-4"><img src={item.image} alt="" className="w-14 h-14 rounded-xl object-cover" /><div className="flex-1 min-w-[180px]"><strong>{item.name}</strong><p className="text-xs text-text-dim mt-1">{item.category} · ${item.price}</p></div><button onClick={() => setItems(prev => prev.map(current => current.id === item.id ? { ...current, availability: !current.availability } : current)} className={`text-xs px-3 py-1 rounded-full ${item.availability ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-300'}`}>{item.availability ? 'Available' : 'Hidden'}</button><button onClick={() => edit(item)} aria-label={`Edit ${item.name}`} className="p-2 text-text-dim hover:text-white"><Edit3 className="w-4 h-4" /></button><button onClick={() => setItems(prev => prev.filter(current => current.id !== item.id))} aria-label={`Delete ${item.name}`} className="p-2 text-text-dim hover:text-red-300"><Trash2 className="w-4 h-4" /></button></div>)}</div></section><form onSubmit={save} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sticky top-6"><h2 className="text-xl font-bold mb-6">{editingId ? 'Edit product' : 'Create product'}</h2><div className="space-y-4"><Field label="Product name" value={form.name} onChange={value => setForm({ ...form, name: value })} /><Field label="Description" value={form.description} onChange={value => setForm({ ...form, description: value })} /><Field label="Price" type="number" value={form.price} onChange={value => setForm({ ...form, price: value })} /><label className="block"><span className="block text-sm text-text-dim mb-2">Category</span><select value={form.category} onChange={event => setForm({ ...form, category: event.target.value })} className="w-full bg-[#151822] border border-white/10 rounded-xl px-4 py-3"><option value="mains">Main course</option><option value="sides">Star-sides</option><option value="desserts">Desserts</option><option value="drinks">Drinks</option></select></label></div><button className="btn-premium w-full mt-6">{editingId ? 'Save changes' : 'Create product'}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(blankProduct); }} className="w-full mt-3 text-sm text-text-dim">Cancel editing</button>}</form></main></div>;
};

const Field = ({ label, value, onChange, type = 'text' }) => <label className="block"><span className="block text-sm text-text-dim mb-2">{label}</span><input required={label !== 'Description'} type={type} value={value} onChange={event => onChange(event.target.value)} className="w-full bg-[#151822] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary" /></label>;
export default AdminProducts;