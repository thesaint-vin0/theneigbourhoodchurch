import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { events } from '../data/events';
import { useEffect, useState } from 'react';

function Countdown({ target }: { target: string }) {
  const calc = () => {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const cells = [
    { v: time.d, l: 'Days' },
    { v: time.h, l: 'Hours' },
    { v: time.m, l: 'Mins' },
    { v: time.s, l: 'Secs' },
  ];

  return (
    <div className="flex gap-3">
      {cells.map((c) => (
        <div key={c.l} className="text-center">
          <div className="w-14 h-14 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center font-display text-xl font-700 text-white">
            {String(c.v).padStart(2, '0')}
          </div>
          <div className="text-xs text-white/60 mt-1">{c.l}</div>
        </div>
      ))}
    </div>
  );
}

export default function EventsPreview() {
  const next = events[0];
  const upcoming = events.slice(1, 4);

  return (
    <section className="section-pad bg-ink text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-700/30 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-tnc relative">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <p className="text-secondary-300 font-600 text-sm uppercase tracking-widest mb-3">What's Happening</p>
              <h2 className="font-display text-3xl md:text-5xl font-700">Upcoming Events</h2>
            </div>
            <Link to="/events" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20">
              All Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured event with countdown */}
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[420px]">
              <img src={next.image} alt={next.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
              <div className="relative p-8 flex flex-col h-full justify-end">
                <span className="inline-block w-fit px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-600 mb-4">
                  {next.category}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-700 mb-3">{next.title}</h3>
                <div className="flex flex-wrap gap-4 text-white/70 text-sm mb-6">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(next.date).toLocaleDateString('en', { month: 'long', day: 'numeric' })}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {next.time}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {next.location}</span>
                </div>
                <Countdown target={next.date} />
                <Link to="/events" className="btn-primary w-fit mt-6 bg-accent-500 hover:bg-accent-600">
                  Register Now
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Upcoming list */}
          <div className="flex flex-col gap-4">
            {upcoming.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.1}>
                <Link to="/events" className="group flex gap-5 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-500 flex flex-col items-center justify-center">
                    <span className="font-display text-2xl font-700">{new Date(e.date).getDate()}</span>
                    <span className="text-xs uppercase">{new Date(e.date).toLocaleDateString('en', { month: 'short' })}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-600 text-secondary-300 uppercase tracking-wider">{e.category}</span>
                    <h4 className="font-600 text-lg group-hover:text-secondary-300 transition-colors">{e.title}</h4>
                    <p className="text-sm text-white/50 mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {e.time} · {e.location}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
