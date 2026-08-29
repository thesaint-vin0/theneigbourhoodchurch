import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { pastors } from '../data/pastors';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook, instagram: Instagram, twitter: Twitter,
};

export default function Pastors() {
  return (
    <>
      <PageHeader
        title="Our Pastors"
        subtitle="Dedicated leaders with a heart for people and a passion for Christ."
        image="https://images.pexels.com/photos/2564688/pexels-photo-2564688.jpeg?auto=compress&cs=tinysrgb&w=1200"
      />

      <section className="section-pad bg-white">
        <div className="container-tnc">
          {/* Lead Pastor feature */}
          <Reveal>
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center mb-20">
              <div className="lg:col-span-2">
                <div className="relative rounded-3xl overflow-hidden shadow-glow">
                  <img src={pastors[0].image} alt={pastors[0].name} className="w-full aspect-[3/4] object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ink/80 to-transparent">
                    <div className="flex gap-3">
                      {pastors[0].socials.map((s) => {
                        const Icon = socialIcons[s.icon] || Facebook;
                        return (
                          <a key={s.label} href={s.url} aria-label={s.label} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/40 transition-colors">
                            <Icon className="w-4 h-4 text-white" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3">
                <p className="text-accent-600 font-600 text-sm uppercase tracking-widest mb-2">{pastors[0].role}</p>
                <h2 className="font-display text-3xl md:text-5xl font-700 text-ink mb-5">{pastors[0].name}</h2>
                <p className="text-ink/70 text-lg leading-relaxed">{pastors[0].bio}</p>
              </div>
            </div>
          </Reveal>

          {/* Pastoral team */}
          <Reveal>
            <h3 className="font-display text-2xl md:text-3xl font-700 text-ink text-center mb-10">The Pastoral Team</h3>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastors.slice(1).map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <div className="group rounded-3xl overflow-hidden bg-white border border-gray-100 hover:shadow-glow transition-all duration-500">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                      {p.socials.map((s) => {
                        const Icon = socialIcons[s.icon] || Facebook;
                        return (
                          <a key={s.label} href={s.url} aria-label={s.label} className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/40 transition-colors">
                            <Icon className="w-4 h-4 text-white" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-600 text-primary-600 uppercase tracking-wider">{p.role}</p>
                    <h4 className="font-display text-xl font-600 text-ink mt-1 mb-2">{p.name}</h4>
                    <p className="text-sm text-ink/60 leading-relaxed line-clamp-3">{p.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
