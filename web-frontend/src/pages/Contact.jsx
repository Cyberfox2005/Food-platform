import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion as Motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-bg-dark min-h-screen text-white">
      <Navbar />
      
      <section className="pt-48 pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <Motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-8xl mb-8 font-display">Get in <span className="text-gradient">Touch</span></h1>
              <p className="text-text-dim text-lg mb-12 leading-relaxed">
                Have questions about our cosmic menu or want to book a private event? Reach out to our crew and we'll get back to you faster than light.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-12 mb-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Location</h4>
                    <p className="text-text-dim text-sm">Orion Nebula, Sector 7G<br />Celestial Way, Unit 42</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Phone</h4>
                    <p className="text-text-dim text-sm">+1 (555) COSMOS-GP<br />Mon-Sun: 11am-11pm</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Email</h4>
                    <p className="text-text-dim text-sm">hello@gravitygrill.io<br />events@gravitygrill.io</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-brand-primary shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Hours</h4>
                    <p className="text-text-dim text-sm">Open Daily<br />11:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Mock Map */}
              <div className="h-64 bg-white/5 rounded-[2.5rem] border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200')] bg-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-brand-primary p-4 rounded-full shadow-glow animate-bounce">
                    <MapPin className="text-white w-6 h-6" />
                  </div>
                </div>
              </div>
            </Motion.div>

            {/* Contact Form */}
            <Motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12"
            >
              <h3 className="text-3xl font-bold mb-8">Send a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-dim ml-4">Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-primary transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-dim ml-4">Email</label>
                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-primary transition-all" placeholder="john@galaxy.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-dim ml-4">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer">
                    <option className="bg-bg-dark">General Inquiry</option>
                    <option className="bg-bg-dark">Table Reservation</option>
                    <option className="bg-bg-dark">Event Booking</option>
                    <option className="bg-bg-dark">Feedback</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-text-dim ml-4">Message</label>
                  <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-primary transition-all resize-none" placeholder="Your message to the crew..."></textarea>
                </div>
                <button type="button" className="btn-premium w-full py-5 flex items-center justify-center gap-2">
                  Initiate Transmission <Send className="w-5 h-5" />
                </button>
              </form>
            </Motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
