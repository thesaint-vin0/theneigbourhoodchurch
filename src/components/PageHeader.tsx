import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  image?: string;
  children?: ReactNode;
}

export default function PageHeader({ title, subtitle, image, children }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-700" />
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-20" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-white" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400/15 rounded-full blur-[120px]" />

      <div className="container-tnc px-6 md:px-12 relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-secondary-300 text-sm font-600 tracking-[0.3em] uppercase mb-4"
        >
          The Neighbourhood Church
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl font-700 text-white text-balance"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
