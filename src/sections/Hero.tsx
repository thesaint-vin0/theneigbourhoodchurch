import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Play, Heart, Calendar } from 'lucide-react';
import { lazy, Suspense } from 'react';

const Hero3D = lazy(() => import('../components/three/Hero3D'));

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient sky background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900 via-primary-800 to-secondary-600" />
      <div className="absolute inset-0 bg-gradient-radial from-accent-400/20 via-transparent to-transparent" />

      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Hero3D className="w-full h-full" />
        </Suspense>
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/10 via-transparent to-ink/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-secondary-200 text-sm md:text-base font-500 tracking-[0.3em] uppercase mb-6"
        >
          Welcome to
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-700 text-white leading-[1.05] text-balance"
        >
          The Neighbourhood
          <br />
          <span className="text-gradient bg-gradient-to-r from-accent-300 via-accent-400 to-secondary-300">
            Church
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 text-lg md:text-xl text-white/80 font-300 max-w-2xl mx-auto"
        >
          A Church Where Everyone Belongs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/contact" className="btn-primary bg-accent-500 hover:bg-accent-600 shadow-glow-accent">
            <Calendar className="w-4 h-4" /> Plan Your Visit
          </Link>
          <Link to="/sermons" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-md">
            <Play className="w-4 h-4" /> Watch Sermons
          </Link>
          <Link to="/giving" className="btn-secondary bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-md">
            <Heart className="w-4 h-4" /> Give Online
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
