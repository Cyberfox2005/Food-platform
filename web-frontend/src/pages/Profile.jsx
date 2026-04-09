import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';
import { products } from '../data/menuData';
import ProductCard from '../components/ProductCard';
import { User, History, Heart, Package, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { favorites, orderHistory } = useUser();
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="bg-bg-dark min-h-screen text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-32 pb-32">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Sidebar / User Info */}
          <div className="w-full md:w-80 bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Commander John</h2>
              <p className="text-text-dim text-sm">Earth Sector 21</p>
            </div>
            
            <div className="space-y-2">
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20 transition-all">
                <History className="w-5 h-5" />
                <span className="font-semibold text-sm">Order History</span>
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 text-text-dim border border-transparent transition-all">
                <Heart className="w-5 h-5" />
                <span className="font-semibold text-sm">Favorites</span>
              </button>
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 text-text-dim border border-transparent transition-all">
                <Package className="w-5 h-5" />
                <span className="font-semibold text-sm">Addresses</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-12 w-full">
            {/* Order History */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-display">Voyage <span className="text-gradient">History</span></h2>
                <span className="bg-white/5 px-4 py-1.5 rounded-full text-xs text-text-dim font-bold uppercase tracking-widest border border-white/10">Recent Orders</span>
              </div>
              
              {orderHistory.length > 0 ? (
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-wrap items-center justify-between gap-6 hover:border-brand-primary/30 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="font-bold">Order #{order.id.toString().slice(-6)}</div>
                          <div className="text-xs text-text-dim flex items-center gap-2">
                            <Calendar className="w-3 h-3" /> {new Date(order.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-text-dim">Status:</span> 
                        <span className="text-green-400 font-bold ml-2">Delivered</span>
                      </div>
                      <div className="text-xl font-bold">${order.total.toFixed(2)}</div>
                      <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-20 text-center">
                  <p className="text-text-dim mb-8">No past voyages recorded yet.</p>
                  <Link to="/menu" className="btn-premium px-8 py-3">Start First Mission</Link>
                </div>
              )}
            </section>

            {/* Favorites */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-display">Your <span className="text-gradient">Favorites</span></h2>
                <Link to="/menu" className="text-brand-primary text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  See All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {favoriteProducts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                  <AnimatePresence mode='popLayout'>
                    {favoriteProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-20 text-center text-text-dim">
                  Your favorite galaxy flavors will appear here.
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
