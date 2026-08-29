import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { ministries } from '../data/ministries';
import { Baby, Flame, Users, Heart, Shield, Hand, Music, Video, Megaphone, Gift } from 'lucide-react';

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  baby: Baby,
  flame: Flame,
  users: Users,
  heart: Heart,
  shield: Shield,
  hand: Hand,
  music: Music,
  video: Video,
  megaphone: Megaphone,
  gift: Gift,
};

export default function MinistriesPreview() {
  return (
    <section className="section-pad bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="container-tnc">
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-primary-700 font-600 text-sm uppercase tracking-widest mb-3">Get Involved</p>
            <h2 className="font-display text-3xl md:text-5xl font-700 text-ink mb-4">Find Your Place to Belong</h2>
            <p className="text-ink/60 text-lg max-w-2xl mx-auto">
              Every ministry is a doorway to connection, growth, and purpose. There is a place for you.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.slice(0, 6).map((m, i) => {
            const Icon = icons[m.icon] || Users;
            return (
              <Reveal key={m.slug} delay={i * 0.08}>
                <Link to={`/ministries/${m.slug}`} className="group block h-full">
                  <div className="relative rounded-2xl overflow-hidden h-full bg-white border border-gray-100 hover:shadow-glow transition-all duration-500">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
                    </div>
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur flex items-center justify-center shadow-soft">
                      <Icon className="w-5 h-5 text-primary-700" />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-600 text-ink mb-1.5 group-hover:text-primary-700 transition-colors">
                        {m.name}
                      </h3>
                      <p className="text-sm text-ink/60 leading-relaxed">{m.tagline}</p>
                      <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-500 text-primary-700 group-hover:gap-3 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="text-center mt-12">
            <Link to="/ministries" className="btn-secondary">
              View All Ministries <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
