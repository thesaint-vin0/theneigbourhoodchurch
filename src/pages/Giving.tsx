import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Building, Globe, Gift, CheckCircle, CreditCard } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { givingFunds } from '../data/site';
import { supabase } from '../services/supabase';

const fundIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart, building: Building, globe: Globe, gift: Gift,
};

const amounts = [10, 25, 50, 100, 250];

export default function Giving() {
  const [fund, setFund] = useState(givingFunds[0].id);
  const [amount, setAmount] = useState<number | ''>(50);
  const [custom, setCustom] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const finalAmount = custom ? Number(custom) : amount;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount <= 0) return;
    setStatus('loading');
    const fundName = givingFunds.find((f) => f.id === fund)?.name || fund;
    const { error } = await supabase.from('giving_records').insert({
      name: form.name || null,
      email: form.email || null,
      fund: fundName,
      amount: finalAmount,
      frequency,
    });
    if (error) { setStatus('error'); return; }
    setStatus('success');
  };

  return (
    <>
      <PageHeader title="Giving" subtitle="Your generosity changes lives. Thank you for your partnership." image="https://images.pexels.com/photos/2689728/pexels-photo-2689728.jpeg?auto=compress&cs=tinysrgb&w=1200" />

      <section className="section-pad bg-white">
        <div className="container-tnc">
          {/* Fund selection */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {givingFunds.map((f, i) => {
              const Icon = fundIcons[f.icon] || Heart;
              return (
                <Reveal key={f.id} delay={i * 0.08}>
                  <button onClick={() => setFund(f.id)} className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 h-full ${fund === f.id ? 'border-primary-700 bg-primary-50 shadow-soft' : 'border-gray-100 bg-white hover:border-primary-200'}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${fund === f.id ? 'bg-primary-700 text-white' : 'bg-primary-100 text-primary-700'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-600 text-ink mb-1">{f.name}</h3>
                    <p className="text-sm text-ink/50 leading-relaxed">{f.description}</p>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Giving form */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Reveal>
              <div className="glass rounded-3xl p-8">
                <h3 className="font-display text-xl font-700 text-ink mb-6">Choose Amount</h3>

                {/* Frequency */}
                <div className="flex gap-2 mb-6">
                  {['one-time', 'weekly', 'monthly'].map((f) => (
                    <button key={f} onClick={() => setFrequency(f)} className={`flex-1 py-2.5 rounded-full text-sm font-500 capitalize transition-all ${frequency === f ? 'bg-primary-800 text-white' : 'bg-gray-50 text-ink/60 hover:bg-primary-50'}`}>
                      {f.replace('-', ' ')}
                    </button>
                  ))}
                </div>

                {/* Amount buttons */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {amounts.map((a) => (
                    <button key={a} onClick={() => { setAmount(a); setCustom(''); }} className={`py-3.5 rounded-xl font-600 transition-all ${amount === a && !custom ? 'bg-primary-800 text-white shadow-soft' : 'bg-gray-50 text-ink/70 hover:bg-primary-50'}`}>
                      ${a}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 font-600">$</span>
                  <input type="number" value={custom} onChange={(e) => { setCustom(e.target.value); setAmount(''); }} placeholder="Custom amount" className="w-full pl-8 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary-300 focus:bg-white transition-all" />
                </div>

                <div className="mt-6 p-4 rounded-xl bg-primary-50 flex items-center justify-between">
                  <span className="text-sm text-ink/60">Total {frequency !== 'one-time' ? `/${frequency.replace('-', 'ly')}` : ''}</span>
                  <span className="font-display text-2xl font-700 text-primary-800">${finalAmount || 0}</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-10 text-center h-full flex flex-col justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl font-700 text-ink mb-2">Thank You!</h3>
                  <p className="text-ink/60 mb-6">Your gift of ${finalAmount} to {givingFunds.find((f) => f.id === fund)?.name} has been recorded. A full payment integration is coming soon.</p>
                  <button onClick={() => setStatus('idle')} className="btn-secondary">Give Again</button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="glass rounded-3xl p-8 space-y-5">
                  <h3 className="font-display text-xl font-700 text-ink">Your Information</h3>
                  <div>
                    <label className="text-sm font-500 text-ink/70 mb-1.5 block">Name</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-100 focus:outline-none focus:border-primary-300 transition-all" />
                  </div>
                  <div>
                    <label className="text-sm font-500 text-ink/70 mb-1.5 block">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-gray-100 focus:outline-none focus:border-primary-300 transition-all" />
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-dashed border-gray-200 text-center">
                    <CreditCard className="w-6 h-6 text-ink/30 mx-auto mb-2" />
                    <p className="text-sm text-ink/50">Secure payment integration coming soon. Your pledge will be recorded and we'll contact you.</p>
                  </div>
                  {status === 'error' && <p className="text-sm text-red-500">Something went wrong. Please try again.</p>}
                  <button type="submit" disabled={status === 'loading' || !finalAmount} className="btn-primary w-full disabled:opacity-50">
                    <Heart className="w-4 h-4" /> Give ${finalAmount || 0}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
