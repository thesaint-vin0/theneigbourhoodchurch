import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote } from 'lucide-react';
import Reveal from '../components/Reveal';
import { testimonials } from '../data/church';

import 'swiper/css';
import 'swiper/css/pagination';

export default function TestimonialsSection() {
  return (
    <section className="section-pad bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container-tnc">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-primary-700 font-600 text-sm uppercase tracking-widest mb-3">Stories of Grace</p>
            <h2 className="font-display text-3xl md:text-5xl font-700 text-ink">Lives Changed Here</h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="!pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.name}>
                <div className="glass rounded-3xl p-8 h-full flex flex-col">
                  <Quote className="w-10 h-10 text-primary-200 mb-4" />
                  <p className="text-ink/80 leading-relaxed flex-1 text-lg">"{t.quote}"</p>
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-600 text-ink">{t.name}</p>
                      <p className="text-sm text-ink/50">{t.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>
      </div>
    </section>
  );
}
