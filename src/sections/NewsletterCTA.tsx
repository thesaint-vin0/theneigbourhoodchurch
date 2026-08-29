import { useState } from 'react';
import { Send } from 'lucide-react';
import Reveal from '../components/Reveal';
import { supabase } from '../services/supabase';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const { error } = await supabase.from('newsletter_subscribers').insert({ email });
    if (error && error.code !== '23505') {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="section-pad bg-white">
      <div className="container-tnc">
        <Reveal>
          <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary-800 to-secondary-600 px-6 py-14 md:px-16 md:py-20 text-center text-white">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent-400/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary-400/20 rounded-full blur-[100px]" />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-700 mb-3">Stay Connected</h2>
              <p className="text-white/70 text-lg mb-8">
                Subscribe to our newsletter for weekly devotionals, event updates, and church news.
              </p>
              <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-accent-400"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary bg-accent-500 hover:bg-accent-600 shadow-glow-accent disabled:opacity-50"
                >
                  <Send className="w-4 h-4" /> Subscribe
                </button>
              </form>
              {status === 'success' && (
                <p className="text-secondary-200 mt-4 text-sm">You're subscribed! Welcome to the family.</p>
              )}
              {status === 'error' && (
                <p className="text-red-300 mt-4 text-sm">Something went wrong. Please try again.</p>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
