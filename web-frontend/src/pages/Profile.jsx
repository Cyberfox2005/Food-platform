import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';
import { products } from '../data/menuData';
import ProductCard from '../components/ProductCard';
import { User, History, Heart, Package, Calendar, ArrowRight, Bell, Gift, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

const Profile = () => {
  const { favorites, orderHistory, updateOrderStatus } = useUser();
  const favoriteProducts = products.filter(p => favorites.includes(p.id));
  const activeOrder = orderHistory.find(order => !['delivered', 'cancelled'].includes(order.status));
  const trackingSteps = ['received', 'confirmed', 'preparing', 'ready', 'out-for-delivery', 'delivered'];
  const activeStep = activeOrder ? Math.max(0, trackingSteps.indexOf(activeOrder.status)) : 0;

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');
    socket.on('status_changed', ({ orderId, status }) => updateOrderStatus(orderId, status));
    return () => socket.disconnect();
  }, [updateOrderStatus]);

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
            {activeOrder && (
              <section className="bg-brand-primary/10 border border-brand-primary/30 rounded-3xl p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                  <div><p className="text-brand-primary uppercase tracking-[0.25em] text-xs font-bold mb-2">Live order</p><h2 className="text-3xl font-display">Order #{activeOrder.id.toString().slice(-6)}</h2></div>
                  <span className="px-3 py-1 rounded-full bg-brand-primary text-xs font-bold uppercase">{activeOrder.status.replaceAll('-', ' ')}</span>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {trackingSteps.map((status, index) => <div key={status} className="text-center"><div className={`h-2 rounded-full mb-3 ${index <= activeStep ? 'bg-brand-primary' : 'bg-white/10'}`} /><span className={`text-[10px] uppercase tracking-wider ${index <= activeStep ? 'text-white' : 'text-text-dim'}`}>{status.replaceAll('-', ' ')}</span></div>)}
                </div>
                <p className="text-text-dim text-sm mt-7">Estimated arrival: 15-25 minutes. We will update this timeline as your order moves through the kitchen.</p>
              </section>
            )}
            <section className="grid lg:grid-cols-2 gap-6" id="notifications">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-6"><Bell className="text-brand-primary" /><h2 className="text-2xl font-display">Notifications</h2></div>
                <div className="space-y-4 text-sm"><div className="flex gap-3"><span className="w-2 h-2 rounded-full bg-brand-primary mt-2 shrink-0" /><p><strong>Welcome aboard.</strong><span className="block text-text-dim">Your next order earns double points this week.</span></p></div><div className="flex gap-3"><span className="w-2 h-2 rounded-full bg-white/20 mt-2 shrink-0" /><p><strong>New drop detected.</strong><span className="block text-text-dim">The seasonal Black Hole dessert is back.</span></p></div></div>
              </div>
              <div className="bg-brand-primary/10 border border-brand-primary/25 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-5"><Gift className="text-brand-primary" /><h2 className="text-2xl font-display">Gravity Rewards</h2></div>
                <div className="flex items-end justify-between mb-3"><div><span className="text-3xl font-bold">1,250</span><span className="text-text-dim text-sm ml-2">points</span></div><span className="text-xs text-brand-primary">250 to next reward</span></div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden"><div className="h-full w-4/5 bg-brand-primary rounded-full" /></div><p className="text-text-dim text-xs mt-4"><Star className="inline w-3 h-3 text-yellow-400" /> Free drink unlocked at 1,500 points</p>
              </div>
            </section>
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
                        <span className={`${order.status === 'delivered' ? 'text-green-400' : 'text-brand-primary'} font-bold ml-2 capitalize`}>{(order.status || 'delivered').replaceAll('-', ' ')}</span>
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
