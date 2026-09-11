import { useState } from 'react';
import { ArrowRight, ChefHat, LockKeyhole, Rocket, ShieldCheck, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { login, register } from '../lib/api';

const accountTypes = [
  { id: 'customer', label: 'Customer', description: 'Orders, favorites, rewards', icon: UserRound },
  { id: 'admin', label: 'Admin', description: 'Operations and analytics', icon: ShieldCheck },
  { id: 'staff', label: 'Staff', description: 'Kitchen and deliveries', icon: ChefHat },
];

const AuthAccount = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [accountType, setAccountType] = useState('customer');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const result = mode === 'login' ? await login({ ...form, accountType }) : await register(form);
      localStorage.setItem('gravity_token', result.token);
      localStorage.setItem('gravity_user', JSON.stringify(result.user));
      navigate(result.user.role === 'admin' ? '/admin' : result.user.role === 'staff' ? '/admin/kitchen' : '/profile');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return <div className="bg-bg-dark min-h-screen text-white"><Navbar /><main className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16"><div className="w-full max-w-2xl"><div className="text-center mb-8"><div className="w-16 h-16 rounded-2xl bg-brand-primary flex items-center justify-center shadow-glow mx-auto mb-5"><Rocket /></div><p className="text-brand-primary uppercase tracking-[0.3em] text-xs font-bold mb-3">Gravity access</p><h1 className="text-4xl font-display">{mode === 'login' ? 'Choose your command center.' : 'Join the crew.'}</h1><p className="text-text-dim mt-3">Access is verified against your account role.</p></div>{mode === 'login' && <div className="grid sm:grid-cols-3 gap-3 mb-5">{accountTypes.map(({ id, label, description, icon: Icon }) => <button type="button" key={id} onClick={() => setAccountType(id)} className={`p-4 rounded-2xl border text-left transition-colors ${accountType === id ? 'border-brand-primary bg-brand-primary/10' : 'border-white/10 bg-white/5 hover:border-brand-primary/40'}`}><Icon className="w-5 h-5 text-brand-primary mb-4" /><strong className="block">{label}</strong><span className="block text-xs text-text-dim mt-1">{description}</span></button>)}</div>}<form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-3xl p-7 space-y-5">{mode === 'register' && <label className="block"><span className="text-sm text-text-dim block mb-2">Name</span><input required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary" /></label>}<label className="block"><span className="text-sm text-text-dim block mb-2">Email</span><input required type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary" /></label><label className="block"><span className="text-sm text-text-dim block mb-2">Password</span><input required minLength={8} type="password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary" /></label>{mode === 'register' && <p className="text-xs text-text-dim">New accounts start as Customer accounts. Admin and Staff access must be assigned by an administrator.</p>}{error && <p role="alert" className="text-sm text-orange-300">{error}</p>}<button disabled={submitting} className="btn-premium w-full flex items-center justify-center gap-2 disabled:opacity-50">{submitting ? 'Connecting...' : mode === 'login' ? `Enter ${accountTypes.find(type => type.id === accountType).label} access` : 'Create customer account'}<ArrowRight className="w-4 h-4" /></button><p className="text-center text-xs text-text-dim"><LockKeyhole className="inline w-3 h-3 mr-1" /> Role-protected access</p></form><button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }} className="w-full text-center text-sm text-text-dim mt-6 hover:text-white">{mode === 'login' ? 'New here? Create a customer account' : 'Already have an account? Sign in'}</button><Link to="/" className="block text-center text-sm text-text-dim mt-4 hover:text-brand-primary">Continue as guest</Link></div></main></div>;
};

export default AuthAccount;
