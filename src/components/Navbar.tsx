import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Church } from 'lucide-react';
import { useState } from 'react';
import { navLinks } from '../data/navigation';
import { useScrollPosition } from '../hooks/useScrollPosition';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrollY = useScrollPosition();
  const location = useLocation();
  const scrolled = scrollY > 40;
  const isHome = location.pathname === '/';

  const solid = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          solid ? 'glass shadow-soft' : 'bg-transparent'
        }`}
      >
        <nav className="container-tnc px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-700 to-secondary-500 text-white shadow-soft group-hover:scale-110 transition-transform">
              <Church className="w-5 h-5" />
            </span>
            <span className={`font-display text-lg md:text-xl font-600 tracking-tight ${solid ? 'text-ink' : 'text-white'}`}>
              TNC
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`relative px-3.5 py-2 text-sm font-500 rounded-full transition-all duration-300 ${
                      solid
                        ? active
                          ? 'text-primary-800'
                          : 'text-ink/70 hover:text-primary-800'
                        : active
                          ? 'text-white'
                          : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className={`absolute inset-0 -z-10 rounded-full ${solid ? 'bg-primary-50' : 'bg-white/15'}`}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <Link to="/giving" className={`hidden lg:inline-flex btn-primary !py-2.5 !px-5 text-sm`}>
            Give Online
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${solid ? 'text-ink' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] glass shadow-glow p-6 pt-24 overflow-y-auto"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-500 transition-colors ${
                        location.pathname === link.path
                          ? 'bg-primary-50 text-primary-800'
                          : 'text-ink/80 hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link to="/giving" onClick={() => setOpen(false)} className="btn-primary w-full mt-6">
                Give Online
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
