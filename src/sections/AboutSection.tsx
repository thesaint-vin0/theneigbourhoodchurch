import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { stats, coreValues, beliefs } from '../data/church';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import { Heart, Book, Hand, Users, Gift, Star } from 'lucide-react';

const valueIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  book: Book,
  hand: Hand,
  users: Users,
  gift: Gift,
  star: Star,
};

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const count = useCountUp(value, 2000, inView);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-700 text-primary-800">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm text-ink/60 font-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <section className="section-pad bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      <div className="container-tnc relative">
        {/* Story */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <Reveal>
            <div className="relative">
              <img
                src="/images/comb.jpeg"
                alt="Church congregation"
                className="rounded-3xl shadow-glow w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 shadow-soft hidden md:block">
                <p className="font-display text-3xl font-700 text-primary-800">18+</p>
                <p className="text-sm text-ink/60">Years of Faith</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-primary-700 font-600 text-sm uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="font-display text-3xl md:text-5xl font-700 text-ink mb-6 leading-tight">
              A Church Built on Love, Growing in Faith
            </h2>
            <p className="text-ink/70 text-lg leading-relaxed mb-4">
              The Neighbourhood Church began in 2025 with a simple vision: to create a place where everyone
              feels they truly belong. What started as a small gathering in a living room has grown into a
              vibrant family of over 500 members.
            </p>
            <p className="text-ink/70 text-lg leading-relaxed mb-8">
              We believe the church is not a building but a people — called to love God, love one another,
              and serve our city. Whoever you are, wherever you are on your journey, there is a place for you here.
            </p>
            <Link to="/about" className="btn-primary">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          <Reveal>
            <div className="glass rounded-3xl p-8 md:p-10 card-hover">
              <div className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center mb-5">
                <Heart className="w-6 h-6 text-primary-700" />
              </div>
              <h3 className="font-display text-2xl font-700 text-ink mb-3">Our Mission</h3>
              <p className="text-ink/70 leading-relaxed">
                To lead people into a growing relationship with Jesus Christ by creating environments
                where everyone is welcomed, loved, and equipped to make a difference.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-8 md:p-10 card-hover">
              <div className="w-12 h-12 rounded-2xl bg-secondary-100 flex items-center justify-center mb-5">
                <Star className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="font-display text-2xl font-700 text-ink mb-3">Our Vision</h3>
              <p className="text-ink/70 leading-relaxed">
                To be a church that reflects the heart of God — where lives are transformed, families are
                restored, and the hope of the gospel reaches every neighbourhood.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Stats */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 px-6 glass rounded-3xl mb-24">
            {stats.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </Reveal>

        {/* Core Values */}
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-primary-700 font-600 text-sm uppercase tracking-widest mb-3">What We Value</p>
            <h2 className="font-display text-3xl md:text-5xl font-700 text-ink">Our Core Values</h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {coreValues.map((v, i) => {
            const Icon = valueIcons[v.icon] || Heart;
            return (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group p-7 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-glow transition-all duration-500 bg-white">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary-700" />
                  </div>
                  <h4 className="font-display text-xl font-600 text-ink mb-2">{v.title}</h4>
                  <p className="text-ink/60 leading-relaxed">{v.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Beliefs */}
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-primary-700 font-600 text-sm uppercase tracking-widest mb-3">What We Believe</p>
            <h2 className="font-display text-3xl md:text-5xl font-700 text-ink">Our Statement of Faith</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {beliefs.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <div className="flex gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-800 text-white flex items-center justify-center font-700 text-sm">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-600 text-ink mb-1">{b.title}</h4>
                  <p className="text-sm text-ink/60 leading-relaxed">{b.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
