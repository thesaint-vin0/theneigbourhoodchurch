import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { galleryItems, galleryCategories } from '../data/gallery';

export default function Gallery() {
  const [category, setCategory] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = galleryItems.filter((g) => category === 'All' || g.category === category);

  const close = () => setLightbox(null);
  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % filtered.length));
  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));

  return (
    <>
      <PageHeader title="Gallery" subtitle="Moments of worship, fellowship, and community." image="https://images.pexels.com/photos/4330187/pexels-photo-4330187.jpeg?auto=compress&cs=tinysrgb&w=1200" />

      <section className="section-pad bg-white">
        <div className="container-tnc">
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-10">
              {galleryCategories.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-500 transition-all ${category === cat ? 'bg-primary-800 text-white shadow-soft' : 'bg-gray-50 text-ink/60 hover:bg-primary-50 hover:text-primary-700'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.04}>
                <button onClick={() => setLightbox(i)} className="group relative rounded-2xl overflow-hidden aspect-square block w-full">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="text-left">
                      <p className="text-white font-600 text-sm">{item.title}</p>
                      <p className="text-white/60 text-xs">{item.category}</p>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 backdrop-blur-sm p-4" onClick={close}>
            <button onClick={close} className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"><X className="w-8 h-8" /></button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 md:left-8 text-white/80 hover:text-white transition-colors"><ChevronLeft className="w-10 h-10" /></button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              src={filtered[lightbox].image}
              alt={filtered[lightbox].title}
              className="max-w-[80vw] max-h-[80vh] rounded-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 md:right-8 text-white/80 hover:text-white transition-colors"><ChevronRight className="w-10 h-10" /></button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white font-600">{filtered[lightbox].title}</p>
              <p className="text-white/50 text-sm">{filtered[lightbox].category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
