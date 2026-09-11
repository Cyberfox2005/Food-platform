import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Rocket } from 'lucide-react';
import Navbar from '../components/Navbar';
import { login, register } from '../lib/api';

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async event => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const result = await (mode === 'login' ? login(form) : register(form));
      localStorage.setItem('gravity_token', result.token);
      localStorage.setItem('gravity_user', JSON.stringify(result.user));
      navigate('/profile');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return <div className="bg-bg-dark min-h-screen text-white"><Navbar /><main className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16"><div className="w-full max-w-md"><div className="text-center mb-10"><div className="w-16 h-16 rounded-2xl bg-brand-primary flex items-center justify-center shadow-glow mx-auto mb-6"><Rocket /></div><p className="text-brand-primary uppercase tracking-[0.3em] text-xs font-bold mb-3">Gravity access</p><h1 className="text-4xl font-display">{mode === 'login' ? 'Welcome back.' : 'Join the crew.'}</h1><p className="text-text-dim mt-3">Save favorites, track orders, and earn rewards.</p></div><form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-3xl p-7 space-y-5">{mode === 'register' && <label className="block"><span className="text-sm text-text-dim block mb-2">Name</span><input required value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary" /></label>}<label className="block"><span className="text-sm text-text-dim block mb-2">Email</span><input required type="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary" /></label><label className="block"><span className="text-sm text-text-dim block mb-2">Password</span><input required minLength={8} type="password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} className="w-full bg-bg-dark border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-brand-primary" /></label>{error && <p role="alert" className="text-sm text-orange-300">{error}</p>}<button disabled={submitting} className="btn-premium w-full flex items-center justify-center gap-2 disabled:opacity-50">{submitting ? 'Connecting...' : mode === 'login' ? 'Sign in' : 'Create account'}<ArrowRight className="w-4 h-4" /></button><p className="text-center text-xs text-text-dim"><LockKeyhole className="inline w-3 h-3 mr-1" /> Secure account access</p></form><button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }} className="w-full text-center text-sm text-text-dim mt-6 hover:text-white">{mode === 'login' ? 'New here? Create an account' : 'Already have an account? Sign in'}</button><Link to="/" className="block text-center text-sm text-text-dim mt-4 hover:text-brand-primary">Continue as guest</Link></div></main></div>;
};

export default Auth;