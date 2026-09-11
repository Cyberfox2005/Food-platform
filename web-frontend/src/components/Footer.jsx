import { Link } from 'react-router-dom';
import { Rocket, Camera, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-bg-dark">
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-brand-primary/20 rounded-lg flex items-center justify-center">
              <Rocket className="text-brand-primary w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold tracking-tighter text-white">GRAVITY<span className="text-brand-primary">GRILL</span></span>
          </Link>
          <p className="text-text-dim text-sm max-w-sm leading-relaxed mb-8">
            Crafting out-of-this-world dining experiences since 2026. Hand-crafted, locally sourced, and seasoned with stardust.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-primary/50 hover:text-brand-primary transition-all"><Camera className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-primary/50 hover:text-brand-primary transition-all"><MessageCircle className="w-5 h-5" /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-primary/50 hover:text-brand-primary transition-all"><Rocket className="w-5 h-5" /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Explore</h4>
          <ul className="flex flex-col gap-4 text-sm text-text-dim">
            <li><Link to="/menu" className="hover:text-white transition-colors">Digital Menu</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors">Join the Crew</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6">Support</h4>
          <ul className="flex flex-col gap-4 text-sm text-text-dim">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Delivery Range</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-text-dim text-xs">© 2026 Gravity Grill. All rights reserved.</p>
        <div className="flex gap-8 text-xs text-text-dim">
          <span>Global HQ: Orion Nebula, Sector 7G</span>
          <span>Open: 11:00 AM - 11:00 PM (Earth Time)</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
