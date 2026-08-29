import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { churchInfo } from '../data/site';
import { supabase } from '../services/supabase';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const { error } = await supabase.from('contact_messages').insert(form);
    if (error) { setStatus('error'); return; }
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you. Reach out anytime." image="https://images.pexels.com/photos/2698849/pexels-photo-2698849.jpeg?auto=compress&cs=tinysrgb&w=1200" />

      <section className="section-pad bg-white">
        <div className="container-tnc">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-4">
              <Reveal>
                <a href={`mailto:${churchInfo.email}`} className="block glass rounded-2xl p-6 hover:shadow-glow transition-all">
                  <div className="w-11 h-11 rounded-xl bg-primary-100 flex items-center justify-center mb-3">
                    <Mail className="w-5 h-5 text-primary-700" />
                  </div>
                  <p className="text-sm text-ink/50">Email</p>
                  <p className="font-600 text-ink">{churchInfo.email}</p>
                </a>
              </Reveal>
              <Reveal delay={0.08}>
                <a href={`tel:${churchInfo.phone}`} className="block glass rounded-2xl p-6 hover:shadow-glow transition-all">
                  <div className="w-11 h-11 rounded-xl bg-secondary-100 flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5 text-secondary-600" />
                  </div>
                  <p className="text-sm text-ink/50">Phone</p>
                  <p className="font-600 text-ink">{churchInfo.phone}</p>
                </a>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="glass rounded-2xl p-6">
                  <div className="w-11 h-11 rounded-xl bg-accent-100 flex items-center justify-center mb-3">
                    <MapPin className="w-5 h-5 text-accent-600" />
                  </div>
                  <p className="text-sm text-ink/50">Address</p>
                  <p className="font-600 text-ink">{churchInfo.address}</p>
                </div>
              </Reveal>
              <Reveal delay={0.24}>
                <a href={`https://wa.me/${churchInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="block glass rounded-2xl p-6 hover:shadow-glow transition-all">
                  <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center mb-3">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-ink/50">WhatsApp</p>
                  <p className="font-600 text-ink">{churchInfo.whatsapp}</p>
                </a>
              </Reveal>
              <Reveal delay={0.32}>
                <div className="glass rounded-2xl p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary-100 flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-primary-700" />
                  </div>
                  <p className="text-sm text-ink/50 mb-2">Service Times</p>
                  {churchInfo.serviceTimes.map((s) => (
                    <p key={s.label} className="text-sm text-ink/70"><span className="font-500">{s.day}:</span> {s.time}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Form + map */}
            <div className="lg:col-span-2 space-y-8">
              <Reveal delay={0.1}>
                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-display text-2xl font-700 text-ink mb-2">Message Sent!</h3>
                    <p className="text-ink/60 mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                    <button onClick={() => setStatus('idle')} className="btn-secondary">Send Another</button>
                  </motion.div>
                ) : (
                  <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-8 space-y-5">
                    <h3 className="font-display text-xl font-700 text-ink">Send Us a Message</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="px-4 py-3 rounded-xl bg-white/60 border border-gray-100 focus:outline-none focus:border-primary-300 transition-all" />
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="px-4 py-3 rounded-xl bg-white/60 border border-gray-100 focus:outline-none focus:border-primary-300 transition-all" />
                    </div>
                    <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-100 focus:outline-none focus:border-primary-300 transition-all" />
                    <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Your message..." className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-100 focus:outline-none focus:border-primary-300 transition-all resize-none" />
                    {status === 'error' && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
                    <button type="submit" disabled={status === 'loading'} className="btn-primary disabled:opacity-50">
                      <Send className="w-4 h-4" /> Send Message
                    </button>
                  </form>
                )}
              </Reveal>

              <Reveal delay={0.2}>
                <div className="rounded-3xl overflow-hidden shadow-soft h-80">
                  <iframe
                    title="Church Location"
                    src={churchInfo.mapEmbed}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
