import { Clock, MapPin, Phone, Navigation } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const locations = [
  { name: 'Orion Sector 7G', address: '42 Nebula Avenue, Orion District', distance: '0.8 mi', phone: '+1 555 0147', hours: '11:00 AM - 11:00 PM' },
  { name: 'Lunar Market', address: '8 Moonstone Street, Central Orbit', distance: '3.2 mi', phone: '+1 555 0182', hours: '10:00 AM - 12:00 AM' },
  { name: 'Nova West', address: '105 Stardust Road, West Quarter', distance: '5.7 mi', phone: '+1 555 0199', hours: '11:00 AM - 10:00 PM' },
];

const Locations = () => <div className="bg-bg-dark min-h-screen text-white"><Navbar /><main className="container mx-auto px-6 pt-36 pb-32"><div className="max-w-3xl mb-16"><p className="text-brand-primary uppercase tracking-[0.3em] text-xs font-bold mb-4">Find your nearest orbit</p><h1 className="text-5xl md:text-7xl font-display mb-6">Come <span className="text-gradient">through.</span></h1><p className="text-text-dim text-lg">Every Gravity Grill location serves the same hand-crafted menu, with delivery and pickup ready when you are.</p></div><div className="grid lg:grid-cols-3 gap-6">{locations.map(location => <article key={location.name} className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-brand-primary/40 transition-colors"><div className="flex justify-between items-start mb-8"><div className="w-12 h-12 rounded-2xl bg-brand-primary/15 flex items-center justify-center"><MapPin className="text-brand-primary" /></div><span className="text-xs text-green-400 border border-green-400/20 px-3 py-1 rounded-full">Open now</span></div><h2 className="text-2xl font-display mb-3">{location.name}</h2><p className="text-text-dim text-sm mb-6">{location.address}</p><div className="space-y-3 text-sm text-text-dim"><p><Navigation className="inline w-4 h-4 mr-2 text-brand-primary" />{location.distance} away</p><p><Phone className="inline w-4 h-4 mr-2 text-brand-primary" />{location.phone}</p><p><Clock className="inline w-4 h-4 mr-2 text-brand-primary" />{location.hours}</p></div><Link to="/menu" className="btn-premium w-full mt-8 text-center block">Order from here</Link></article>)}</div></main><Footer /></div>;

export default Locations;