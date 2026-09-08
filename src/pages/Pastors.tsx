import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { pastors as fallbackPastors, Pastor } from '../data/pastors';
import { getPastors } from '../services/siteContent';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Globe } from 'lucide-react';

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = { facebook: Facebook, instagram: Instagram, twitter: Twitter, youtube: Youtube, linkedin: Linkedin, website: Globe };

export default function Pastors() {
  const [pastors, setPastors] = useState<Pastor[]>(fallbackPastors);
  useEffect(() => { getPastors().then(setPastors); }, []);
  const lead = pastors[0];
  return (
    <>
      <PageHeader title="Our Pastors" subtitle="Dedicated leaders with a heart for people and a passion for Christ." image="https://images.pexels.com/photos/2564688/pexels-photo-2564688.jpeg?auto=compress&cs=tinysrgb&w=1200" />
      <section className="section-pad bg-white"><div className="container-tnc">
        {lead && <Reveal><div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center mb-10"><div className="lg:col-span-2"><div className="relative rounded-3xl overflow-hidden shadow-glow"><img src={lead.image} alt={lead.name} className="w-full aspect-[3/4] object-cover"/><div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink/80 to-transparent"><div className="flex gap-3">{lead.socials.map((s) => { const Icon=socialIcons[s.icon]||Globe; return <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/40 transition-colors"><Icon className="w-4 h-4 text-white"/></a>; })}</div></div></div></div><div className="lg:col-span-3"><p className="text-accent-600 font-600 text-sm uppercase tracking-widest mb-2">{lead.role}</p><h2 className="font-display text-3xl md:text-5xl font-700 text-ink mb-5">{lead.name}</h2><p className="text-ink/70 text-lg leading-relaxed">{lead.bio}</p></div></div></Reveal>}
        <Reveal><h3 className="font-display text-2xl md:text-3xl font-700 text-ink text-center mb-10">The Pastoral Team</h3></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">{pastors.slice(1).map((p,i)=><Reveal key={p.id||p.name} delay={i*0.1}><div className="group rounded-3xl overflow-hidden bg-white border border-gray-100 hover:shadow-glow transition-all duration-500"><div className="relative aspect-[3/4] overflow-hidden"><img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/><div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"/><div className="absolute bottom-4 left-4 right-4 flex gap-2">{p.socials.map((s)=>{const Icon=socialIcons[s.icon]||Globe;return <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/40 transition-colors"><Icon className="w-4 h-4 text-white"/></a>})}</div></div><div className="p-6"><p className="text-sm font-600 text-primary-600 uppercase tracking-wider">{p.role}</p><h4 className="font-display text-xl font-600 text-ink mt-1 mb-2">{p.name}</h4><p className="text-sm text-ink/60 leading-relaxed line-clamp-3">{p.bio}</p></div></div></Reveal>)}</div>
      </div></section>
    </>
  );
}
