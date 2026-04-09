import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion as Motion } from 'framer-motion';
import { Star, ShieldCheck, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-bg-dark min-h-screen text-white">
      <Navbar />
      
      {/* Story Section */}
      <section className="pt-48 pb-32 relative overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <Motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="z-10"
          >
            <h1 className="text-5xl md:text-8xl mb-8 font-display">Our <span className="text-gradient">Craft</span></h1>
            <p className="text-text-dim text-lg md:text-xl leading-relaxed mb-8">
              Founded in 2026, Gravity Grill was born from a simple mission: to create food that defies expectations. We believe that great dining should be an out-of-this-world experience, combining molecular gastronomy with classic comfort.
            </p>
            <p className="text-text-dim text-lg leading-relaxed mb-12">
              Our chefs are more than cooks; they are flavor engineers, sourcing ingredients from the finest organic terrestrial farms and seasoning each dish with our proprietary "stardust" spice blends.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-display font-bold text-brand-primary mb-2">20+</div>
                <div className="text-sm text-text-dim uppercase tracking-wider">Expert Chefs</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-brand-primary mb-2">15k+</div>
                <div className="text-sm text-text-dim uppercase tracking-wider">Happy Voyagers</div>
              </div>
            </div>
          </Motion.div>
          <Motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="rounded-[4rem] overflow-hidden border border-white/10 shadow-glow">
               <img 
                src="/src/assets/about-hero.jpg" 
                alt="Kitchen Craft" 
                className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800'; }}
               />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-brand-primary p-8 rounded-3xl shadow-glow hidden md:block">
               <Star className="text-white w-12 h-12" />
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl mb-6">The <span className="text-gradient">Principles</span></h2>
            <p className="text-text-dim">What makes Gravity Grill truly special is our commitment to these four core pillars.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { icon: <ShieldCheck />, title: 'Purity', desc: '100% organic, non-GMO ingredients sourced from sustainable partners.' },
              { icon: <Star />, title: 'Innovation', desc: 'Pushing the boundaries of flavor with molecular cooking techniques.' },
              { icon: <Heart />, title: 'Passion', desc: 'Every burger is hand-crafted with obsession for detail.' },
              { icon: <Users />, title: 'Community', desc: 'Supporting local growers and cosmic enthusiasts everywhere.' },
            ].map((pillar, i) => (
              <Motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-primary/20 group-hover:text-brand-primary transition-all">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{pillar.title}</h3>
                <p className="text-text-dim text-sm leading-relaxed">{pillar.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
