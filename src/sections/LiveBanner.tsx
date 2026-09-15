import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { churchInfo } from '../data/site';
import { getSiteContent, SiteContent } from '../services/siteContent';
import { useEffect, useState } from 'react';

export default function LiveBanner() {
  const [site, setSite] = useState<SiteContent | null>(null);

  useEffect(() => {
    let mounted = true;

    getSiteContent().then((content) => {
      if (mounted) setSite(content);
    });

    return () => {
      mounted = false;
    };
  }, []);

  // The banner is intentionally hidden until the CMS settings have loaded.
  // It is shown only when an admin has enabled the live service and supplied
  // a live video URL.
  if (!site || !site.live_service_enabled || !site.live_video_url?.trim()) {
    return null;
  }

  const info = site || churchInfo;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="relative z-30"
    >
      <div className="container-tnc px-6 md:px-12">
        <div className="glass rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-soft -mt-2">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <p className="text-sm font-600 text-ink">Live Service Sundays</p>
            <span className="hidden sm:flex items-center gap-1.5 text-sm text-ink/60">
              <Clock className="w-3.5 h-3.5" /> 9:00 AM & 11:30 AM
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-sm text-ink/60">
              <MapPin className="w-3.5 h-3.5" /> {info.address}
            </span>
          </div>
          <a
            href={site.live_video_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sm font-600 text-primary-700 hover:gap-2 transition-all"
          >
            Watch Live <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
