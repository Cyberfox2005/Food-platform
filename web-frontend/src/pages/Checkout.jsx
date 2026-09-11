import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, MapPin, Truck } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { createOrder } from '../lib/api';

const steps = ['Fulfillment', 'Details', 'Payment'];

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useUser();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderType, setOrderType] = useState('delivery');
  const [placed, setPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmationId, setConfirmationId] = useState('');

  const deliveryFee = orderType === 'delivery' ? 2.5 : 0;
  const total = cartTotal + deliveryFee;

  const placeOrder = async () => {
    setSubmitting(true);
    setError('');
    const orderDraft = { items: cartItems, orderType, customer: { name: 'Commander John' } };

    try {
      const savedOrder = await createOrder(orderDraft);
      addOrder(savedOrder);
      setConfirmationId(String(savedOrder.id).slice(-5));
    } catch {
      addOrder({ ...orderDraft, total, status: 'received' });
      setConfirmationId(String(Date.now()).slice(-5));
      setError('The restaurant API is offline, so this order is saved locally for preview.');
    }

    setPlaced(true);
    clearCart();
    setSubmitting(false);
  };

  if (!cartItems.length && !placed) {
    return (
      <div className="bg-bg-dark min-h-screen text-white">
        <Navbar />
        <main className="container mx-auto px-6 pt-40 pb-32 text-center">
          <h1 className="text-4xl font-display mb-4">Your checkout is waiting</h1>
          <p className="text-text-dim mb-8">Add something delicious before continuing.</p>
          <Link to="/menu" className="btn-premium inline-flex">Browse menu</Link>
        </main>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="bg-bg-dark min-h-screen text-white">
        <Navbar />
        <main className="container mx-auto px-6 pt-40 pb-32 text-center max-w-2xl">
          <div className="w-20 h-20 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-brand-primary" />
          </div>
          <p className="text-brand-primary uppercase tracking-[0.3em] text-xs font-bold mb-4">Order confirmed</p>
          <h1 className="text-5xl font-display mb-6">Your meal is in motion.</h1>
          <p className="text-text-dim text-lg mb-10">Order #GG-{confirmationId} is being prepared. Estimated arrival: 15-25 minutes.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate('/profile')} className="btn-premium">Track order</button>
            <Link to="/menu" className="px-8 py-4 rounded-full border border-white/10 hover:border-brand-primary/50 transition-colors">Continue shopping</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-bg-dark min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto px-6 pt-32 pb-32">
        <Link to="/cart" className="inline-flex items-center gap-2 text-text-dim hover:text-white mb-10"><ArrowLeft className="w-4 h-4" /> Back to cart</Link>
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
          <section>
            <p className="text-brand-primary uppercase tracking-[0.3em] text-xs font-bold mb-4">Secure checkout</p>
            <h1 className="text-5xl font-display mb-10">Bring it <span className="text-gradient">home.</span></h1>
            <div className="flex gap-2 mb-10" aria-label="Checkout progress">
              {steps.map((label, index) => (
                <button key={label} onClick={() => index <= step && setStep(index)} className={`flex-1 text-left border-t-2 pt-3 text-xs uppercase tracking-widest ${index <= step ? 'border-brand-primary text-white' : 'border-white/10 text-text-dim'}`}>
                  0{index + 1} {label}
                </button>
              ))}
            </div>

            {step === 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                <button onClick={() => setOrderType('delivery')} className={`p-6 rounded-2xl border text-left transition-colors ${orderType === 'delivery' ? 'border-brand-primary bg-brand-primary/10' : 'border-white/10 bg-white/5'}`}>
                  <Truck className="text-brand-primary mb-5" />
                  <strong className="block text-lg mb-2">Delivery</strong>
                  <span className="text-sm text-text-dim">To your door in 15-25 min</span>
                </button>
                <button onClick={() => setOrderType('pickup')} className={`p-6 rounded-2xl border text-left transition-colors ${orderType === 'pickup' ? 'border-brand-primary bg-brand-primary/10' : 'border-white/10 bg-white/5'}`}>
                  <MapPin className="text-brand-primary mb-5" />
                  <strong className="block text-lg mb-2">Pickup</strong>
                  <span className="text-sm text-text-dim">Ready at Orion Sector 7G</span>
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4 max-w-xl">
                {['Full name', 'Phone number', 'Street and building', 'Delivery instructions'].map((label) => <label key={label} className="block"><span className="block text-sm text-text-dim mb-2">{label}</span><input required placeholder={label} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-brand-primary" /></label>)}
              </div>
            )}

            {step === 2 && <div className="p-6 bg-white/5 border border-white/10 rounded-2xl max-w-xl"><h2 className="text-xl font-bold mb-3">Payment method</h2><p className="text-text-dim mb-5">Payment providers can be connected here when the backend is enabled.</p><label className="flex items-center gap-3"><input type="radio" defaultChecked name="payment" /> Cash on delivery</label></div>}

            {error && <p role="alert" className="mt-5 text-sm text-orange-300">{error}</p>}
            <button disabled={submitting} onClick={() => step < 2 ? setStep(step + 1) : placeOrder()} className="btn-premium mt-10 inline-flex items-center gap-3 disabled:opacity-50">{submitting ? 'Sending order...' : step < 2 ? 'Continue' : 'Place order'}<ArrowRight className="w-5 h-5" /></button>
          </section>

          <aside className="bg-white/5 border border-white/10 rounded-3xl p-6 sticky top-28">
            <h2 className="text-xl font-bold mb-6">Your order</h2>
            <div className="space-y-4 mb-6">{cartItems.map((item) => <div key={item.id} className="flex justify-between gap-4 text-sm"><span className="text-text-dim">{item.quantity} × {item.name}</span><span>${(item.price * item.quantity).toFixed(2)}</span></div>)}</div>
            <div className="border-t border-white/10 pt-5 space-y-3"><div className="flex justify-between text-text-dim"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div><div className="flex justify-between text-text-dim"><span>Delivery</span><span>{deliveryFee ? `$${deliveryFee.toFixed(2)}` : 'Free'}</span></div><div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10"><span>Total</span><span className="text-brand-primary">${total.toFixed(2)}</span></div></div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Checkout;