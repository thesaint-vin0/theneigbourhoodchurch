import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
import { dailyVerses, memoryVerse, announcements } from '../data/church';
import Reveal from '../components/Reveal';

export default function DailyVerse() {
  const [verse, setVerse] = useState(dailyVerses[0]);

  useEffect(() => {
    const day = new Date().getDate();
    setVerse(dailyVerses[day % dailyVerses.length]);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-secondary-600 text-white">
      <div className="absolute inset-0 bg-gradient-radial from-accent-400/15 via-transparent to-transparent" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-accent-400/10 rounded-full blur-[100px]" />

      <div className="container-tnc px-6 md:px-12 relative">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Daily verse */}
          <Reveal className="lg:col-span-2">
            <div className="glass-dark rounded-3xl p-8 md:p-12 h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-11 h-11 rounded-xl bg-accent-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-secondary-300">Daily Bible Verse</p>
                  <p className="text-sm text-white/60">A word for today</p>
                </div>
              </div>
              <motion.blockquote
                key={verse.ref}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display text-xl md:text-3xl leading-relaxed font-500 mb-4"
              >
                "{verse.text}"
              </motion.blockquote>
              <p className="text-accent-300 font-600 text-lg">— {verse.ref}</p>
            </div>
          </Reveal>

          {/* Memory verse + announcements */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1}>
              <div className="glass-dark rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-accent-400" />
                  <p className="text-xs uppercase tracking-widest text-secondary-300">Weekly Memory Verse</p>
                </div>
                <p className="font-display text-base leading-relaxed font-500 mb-2">"{memoryVerse.text}"</p>
                <p className="text-accent-300 font-600 text-sm">— {memoryVerse.ref}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="glass-dark rounded-3xl p-6 flex-1">
                <p className="text-xs uppercase tracking-widest text-secondary-300 mb-4">Latest Announcements</p>
                <ul className="space-y-3">
                  {announcements.map((a) => (
                    <li key={a.title} className="flex gap-3">
                      <span className="flex-shrink-0 w-12 text-xs text-accent-300 font-600">{a.date}</span>
                      <div>
                        <p className="text-sm font-500">{a.title}</p>
                        <p className="text-xs text-white/50">{a.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
