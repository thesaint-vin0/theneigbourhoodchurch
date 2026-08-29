import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Heart, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { prayerCategories } from '../data/site';
import { supabase } from '../services/supabase';

export default function Prayer() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', category: prayerCategories[0], message: '', anonymous: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const payload = {
      name: form.anonymous ? null : form.name || null,
      email: form.email || null,
      phone: form.phone || null,
      category: form.category,
      message: form.message,
      anonymous: form.anonymous,
    };
    const { error } = await supabase.from('prayer_requests').insert(payload);
    if (error) { setStatus('error'); return; }
    setStatus('success');
    setForm({ name: '', email: '', phone: '', category: prayerCategories[0], message: '', anonymous: false });
  };

  return (
    <>
      <PageHeader title="Prayer Request" subtitle="We would be honored to pray with you." image="https://images.pexels.com/photos/8108065/pexels-photo-8108065.jpeg?auto=compress&cs=tinysrgb&w=1200" />

      <section className="section-pad bg-white">
        <div className="container-tnc max-w-5xl">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info side */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 text-primary-700" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-700 text-ink mb-4">You Are Not Alone</h2>
                <p className="text-ink/60 leading-relaxed mb-6">
                  Whatever you are walking through, our prayer team is here to stand with you in faith.
                  Every request is treated with confidentiality and care.
                </p>
                <div className="glass rounded-2xl p-5">
                  <p className="text-sm text-ink/50 mb-1">Prayer Line</p>
                  <p className="font-600 text-ink">Wednesdays, 6:00 AM & 9:00 PM</p>
                </div>
              </Reveal>
            </div>

            {/* Form side */}
            <div className="lg:col-span-3">
              <Reveal delay={0.1}>
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-display text-2xl font-700 text-ink mb-2">Prayer Received</h3>
                    <p className="text-ink/60 mb-6">Our team is praying for you. God hears, and He cares.</p>
                    <button onClick={() => setStatus('idle')} className="btn-secondary">Submit Another Request</button>
                  </motion.div>
                ) : (
                  <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-8 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-500 text-ink/70 mb-1.5 block">Name</label>
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={form.anonymous} placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-100 focus:outline-none focus:border-primary-300 transition-all disabled:opacity-40" />
                      </div>
                      <div>
                        <label className="text-sm font-500 text-ink/70 mb-1.5 block">Email</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-100 focus:outline-none focus:border-primary-300 transition-all" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-500 text-ink/70 mb-1.5 block">Phone</label>
                        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Optional" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-100 focus:outline-none focus:border-primary-300 transition-all" />
                      </div>
                      <div>
                        <label className="text-sm font-500 text-ink/70 mb-1.5 block">Prayer Category</label>
                        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-100 focus:outline-none focus:border-primary-300 transition-all">
                          {prayerCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-500 text-ink/70 mb-1.5 block">Prayer Request</label>
                      <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Share your prayer request..." className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-100 focus:outline-none focus:border-primary-300 transition-all resize-none" />
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={form.anonymous} onChange={(e) => setForm({ ...form, anonymous: e.target.checked })} className="w-5 h-5 rounded accent-primary-700" />
                      <span className="text-sm text-ink/70">Submit anonymously</span>
                    </label>
                    {status === 'error' && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-50">
                      <Send className="w-4 h-4" /> Submit Prayer Request
                    </button>
                  </form>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
