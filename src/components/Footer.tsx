import { Link } from 'react-router-dom';
import { Church, Mail, Phone, MapPin, ArrowUp, Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';
import { useState } from 'react';
import { navLinks } from '../data/navigation';
import { churchInfo } from '../data/site';
import { supabase } from '../services/supabase';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const { error } = await supabase.from('newsletter_subscribers').insert({ email });
    if (error) {
      if (error.code === '23505') {
        setStatus('success');
        setEmail('');
        return;
      }
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return (
    <footer className="relative bg-ink text-white pt-20 pb-8 overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-700/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-tnc px-6 md:px-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-400 text-white">
                <Church className="w-5 h-5" />
              </span>
              <span className="font-display text-xl font-600">TNC</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              The Neighbourhood Church. Where Faith Meets Family. A church where everyone belongs.
            </p>
            <div className="flex gap-3">
              {churchInfo.socials.map((s) => {
                const Icon = iconMap[s.icon] || Church;
                return (
                  <a
                    key={s.label}
                    href={s.url}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-600 text-sm uppercase tracking-wider text-white/40 mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/70 hover:text-secondary-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service times */}
          <div>
            <h4 className="font-600 text-sm uppercase tracking-wider text-white/40 mb-4">Service Times</h4>
            <ul className="space-y-3">
              {churchInfo.serviceTimes.map((s) => (
                <li key={s.label}>
                  <p className="text-sm font-500 text-white">{s.label}</p>
                  <p className="text-sm text-white/60">{s.day} · {s.time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-600 text-sm uppercase tracking-wider text-white/40 mb-4">Newsletter</h4>
            <p className="text-sm text-white/60 mb-4">Get weekly updates and devotionals in your inbox.</p>
            <form onSubmit={subscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 px-4 py-2.5 rounded-full bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-secondary-400"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-secondary-400 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {status === 'success' && (
              <p className="text-xs text-secondary-300 mt-2">Subscribed! Welcome to the family.</p>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-400 mt-2">Something went wrong. Try again.</p>
            )}
          </div>
        </div>

        {/* Contact bar */}
        <div className="flex flex-wrap gap-6 pb-8 border-b border-white/10">
          <a href={`mailto:${churchInfo.email}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <Mail className="w-4 h-4" /> {churchInfo.email}
          </a>
          <a href={`tel:${churchInfo.phone}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <Phone className="w-4 h-4" /> {churchInfo.phone}
          </a>
          <span className="flex items-center gap-2 text-sm text-white/60">
            <MapPin className="w-4 h-4" /> {churchInfo.address}
          </span>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} The Neighbourhood Church. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
          >
            Back to Top
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <ArrowUp className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
