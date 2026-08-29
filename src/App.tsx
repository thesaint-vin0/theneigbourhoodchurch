import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import Layout from './layouts/Layout';
import ScrollToTop from './components/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Pastors = lazy(() => import('./pages/Pastors'));
const Ministries = lazy(() => import('./pages/Ministries'));
const MinistryDetail = lazy(() => import('./pages/MinistryDetail'));
const Sermons = lazy(() => import('./pages/Sermons'));
const Events = lazy(() => import('./pages/Events'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Giving = lazy(() => import('./pages/Giving'));
const Prayer = lazy(() => import('./pages/Prayer'));
const Contact = lazy(() => import('./pages/Contact'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pastors" element={<Pastors />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/ministries/:slug" element={<MinistryDetail />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/giving" element={<Giving />} />
          <Route path="/prayer" element={<Prayer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-700 animate-spin" /></div>}>
          <AnimatedRoutes />
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
