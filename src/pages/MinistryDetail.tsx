import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { ministries } from '../data/ministries';
import { Baby, Flame, Users, Heart, Shield, Hand, Music, Video, Megaphone, Gift } from 'lucide-react';

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  baby: Baby, flame: Flame, users: Users, heart: Heart, shield: Shield, hand: Hand,
  music: Music, video: Video, megaphone: Megaphone, gift: Gift,
};

export default function MinistryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const ministry = ministries.find((m) => m.slug === slug);

  if (!ministry) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="font-display text-3xl font-700 text-ink mb-4">Ministry Not Found</h1>
        <Link to="/ministries" className="btn-primary">Back to Ministries</Link>
      </div>
    );
  }

  const Icon = icons[ministry.icon] || Users;

  return (
    <>
      <PageHeader title={ministry.name} subtitle={ministry.tagline} image={ministry.image} />

      <section className="section-pad bg-white">
        <div className="container-tnc max-w-4xl">
          <Link to="/ministries" className="inline-flex items-center gap-2 text-primary-700 font-500 mb-8 hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" /> All Ministries
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <Reveal>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary-700" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-700 text-ink mb-4">About This Ministry</h2>
                <p className="text-ink/70 text-lg leading-relaxed mb-8">{ministry.description}</p>

                <div className="glass rounded-2xl p-6 mb-8">
                  <h3 className="font-600 text-ink mb-4">Get Involved</h3>
                  <p className="text-ink/60 leading-relaxed">
                    Ready to join? Come to our next meeting or contact our ministry leader. We'd love to welcome you.
                  </p>
                  <Link to="/contact" className="btn-primary mt-5">Contact Us</Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6 h-fit">
                <h3 className="font-600 text-ink mb-4">Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-primary-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-ink/50">Leader</p>
                      <p className="font-500 text-ink">{ministry.leader}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-ink/50">Meeting Time</p>
                      <p className="font-500 text-ink">{ministry.meetingTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
