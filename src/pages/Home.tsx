import Hero from '../sections/Hero';
import LiveBanner from '../sections/LiveBanner';
import AboutSection from '../sections/AboutSection';
import MinistriesPreview from '../sections/MinistriesPreview';
import SermonsPreview from '../sections/SermonsPreview';
import EventsPreview from '../sections/EventsPreview';
import DailyVerse from '../sections/DailyVerse';
import TestimonialsSection from '../sections/TestimonialsSection';
import NewsletterCTA from '../sections/NewsletterCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <LiveBanner />
      <AboutSection />
      <MinistriesPreview />
      <SermonsPreview />
      <EventsPreview />
      <DailyVerse />
      <TestimonialsSection />
      <NewsletterCTA />
    </>
  );
}
