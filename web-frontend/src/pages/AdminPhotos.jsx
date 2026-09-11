import { useState } from 'react';
import { ArrowLeft, ImagePlus, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/menuData';

export default function AdminPhotos() {
  const [photos, setPhotos] = useState(products.map(product => ({ name: product.name, src: product.image })));
  const upload = event => {
    const files = Array.from(event.target.files || []);
    setPhotos(previous => [...previous, ...files.map(file => ({ name: file.name, src: URL.createObjectURL(file) }))]);
  };
  return <div className="min-h-screen bg-[#0b0d12] text-white"><header className="border-b border-white/10 px-6 py-5 flex items-center gap-4"><Link to="/admin" className="p-2"><ArrowLeft className="w-5 h-5" /></Link><div><p className="text-xs uppercase tracking-[0.25em] text-brand-primary">Gravity Ops</p><h1 className="text-2xl font-display">Photo library</h1></div></header><main className="p-6 lg:p-10 max-w-6xl mx-auto"><label className="block border-2 border-dashed border-brand-primary/40 bg-brand-primary/5 rounded-3xl p-10 text-center cursor-pointer hover:bg-brand-primary/10 transition-colors"><ImagePlus className="w-10 h-10 text-brand-primary mx-auto mb-4" /><strong className="block text-lg">Upload food photos</strong><span className="block text-sm text-text-dim mt-2">PNG, JPG, or WebP images</span><input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={upload} className="sr-only" /></label><section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">{photos.map((photo, index) => <article key={`${photo.name}-${index}`} className="bg-white/5 border border-white/10 rounded-2xl p-3"><img src={photo.src} alt={photo.name} className="w-full aspect-square object-cover rounded-xl" /><div className="flex items-center gap-2 mt-3 text-sm"><Upload className="w-4 h-4 text-brand-primary" /><span className="truncate">{photo.name}</span></div></article>)}</section></main></div>;
}
