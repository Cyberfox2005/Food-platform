import { useState } from 'react';
import { ArrowLeft, Edit3, PackagePlus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products as initialProducts } from '../data/menuData';

const empty = { name: '', description: '', price: '', category: 'mains' };

export default function AdminProductManager() {
  const [items, setItems] = useState(initialProducts.map(item => ({ ...item, availability: true })));
  const [form, setForm] = useState(empty);
  const [image, setImage] = useState(initialProducts[0].image);
  const [editingId, setEditingId] = useState(null);
  const save = event => {
    event.preventDefault();
    if (!form.name || !form.price) return;
    if (editingId) setItems(previous => previous.map(item => item.id === editingId ? { ...item, ...form, price: Number(form.price) } : item));
    else setItems(previous => [...previous, { ...form, id: Date.now(), price: Number(form.price), image, dietary: [], rating: 0, reviewsCount: 0, availability: true }]);
    setForm(empty);
    setEditingId(null);
  };
  const beginEdit = item => { setEditingId(item.id); setImage(item.image); setForm({ name: item.name, description: item.description, price: item.price, category: item.category }); };
  const toggle = id => setItems(previous => previous.map(item => item.id === id ? { ...item, availability: !item.availability } : item));
  const remove = id => setItems(previous => previous.filter(item => item.id !== id));
  return <div className="min-h-screen bg-[#0b0d12] text-white"><header className="border-b border-white/10 px-6 py-5 flex items-center gap-4"><Link to="/admin" className="p-2"><ArrowLeft className="w-5 h-5" /></Link><div><p className="text-xs uppercase tracking-[0.25em] text-brand-primary">Gravity Ops</p><h1 className="text-2xl font-display">Product management</h1></div></header><main className="p-6 lg:p-10 max-w-7xl mx-auto grid xl:grid-cols-[1fr_360px] gap-8"><section className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden"><div className="p-6 flex justify-between"><div><h2 className="text-xl font-bold">Menu catalog</h2><p className="text-sm text-text-dim">{items.length} products configured</p></div><PackagePlus className="text-brand-primary" /></div>{items.map(item => <div key={item.id} className="p-5 border-t border-white/10 flex items-center gap-4"><img src={item.image} alt="" className="w-14 h-14 rounded-xl object-cover" /><div className="flex-1"><strong>{item.name}</strong><p className="text-xs text-text-dim">{item.category} · ${item.price}</p></div><button onClick={() => toggle(item.id)} className="text-xs">{item.availability ? 'Available' : 'Hidden'}</button><button onClick={() => beginEdit(item)} aria-label="Edit product"><Edit3 className="w-4 h-4" /></button><button onClick={() => remove(item.id)} aria-label="Delete product"><Trash2 className="w-4 h-4" /></button></div>)}</section><form onSubmit={save} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6"><h2 className="text-xl font-bold mb-6">{editingId ? 'Edit product' : 'Create product'}</h2><Field label="Product name" value={form.name} setValue={value => setForm({ ...form, name: value })} /><Field label="Description" value={form.description} setValue={value => setForm({ ...form, description: value })} /><Field label="Price" type="number" value={form.price} setValue={value => setForm({ ...form, price: value })} /><label className="block mt-4"><span className="block text-sm text-text-dim mb-2">Category</span><select value={form.category} onChange={event => setForm({ ...form, category: event.target.value })} className="w-full bg-[#151822] border border-white/10 rounded-xl px-4 py-3"><option value="mains">Main course</option><option value="sides">Star-sides</option><option value="desserts">Desserts</option><option value="drinks">Drinks</option></select></label><button className="btn-premium w-full mt-6">{editingId ? 'Save changes' : 'Create product'}</button></form></main></div>;
}

const Field = ({ label, value, setValue, type = 'text' }) => <label className="block mt-4"><span className="block text-sm text-text-dim mb-2">{label}</span><input required={label !== 'Description'} type={type} value={value} onChange={event => setValue(event.target.value)} className="w-full bg-[#151822] border border-white/10 rounded-xl px-4 py-3" /></label>;
