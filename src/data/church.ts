export interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'James & Maria',
    role: 'Members since 2015',
    image: 'https://images.pexels.com/photos/2564688/pexels-photo-2564688.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'We walked in as strangers and walked out as family. TNC gave us a home when we needed one most.',
  },
  {
    name: 'Chidi Okafor',
    role: 'Youth Leader',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'The youth ministry shaped my faith and my future. I found purpose and lifelong friends here.',
  },
  {
    name: 'Funmi Adeleke',
    role: 'Prayer Team Lead',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'I came broken and was met with love, not judgment. This church truly lives its tagline.',
  },
  {
    name: 'The Bello Family',
    role: 'Members since 2019',
    image: 'https://images.pexels.com/photos/2689728/pexels-photo-2689728.jpeg?auto=compress&cs=tinysrgb&w=400',
    quote: 'Our kids love Sunday mornings. The children\u2019s ministry is full of joy and genuine care.',
  },
];

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
}

export const coreValues: CoreValue[] = [
  { title: 'Belonging', description: 'Everyone is welcome here \u2014 no perfect people required.', icon: 'heart' },
  { title: 'Biblical Truth', description: 'We stand on God\u2019s Word as the foundation for life and faith.', icon: 'book' },
  { title: 'Compassion', description: 'We love our neighbours in word and in practical action.', icon: 'hand' },
  { title: 'Community', description: 'Life is better together. We grow, serve, and worship as family.', icon: 'users' },
  { title: 'Generosity', description: 'We give freely because we have received freely.', icon: 'gift' },
  { title: 'Excellence', description: 'We honor God by giving our best in all we do.', icon: 'star' },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 200, suffix: '+', label: 'Members' },
  { value: 18, suffix: '', label: 'Years Serving' },
  { value: 10, suffix: '', label: 'Ministries' },
  { value: 1, suffix: '+', label: 'Countries Reached' },
];

export interface Belief {
  title: string;
  description: string;
}

export const beliefs: Belief[] = [
  { title: 'The Scriptures', description: 'We believe the Bible is the inspired, infallible, and authoritative Word of God.' },
  { title: 'The Trinity', description: 'We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit.' },
  { title: 'Salvation', description: 'We believe salvation is by grace through faith in Jesus Christ alone.' },
  { title: 'The Church', description: 'We believe the church is the body of Christ, called to worship, fellowship, and mission.' },
  { title: 'Eternity', description: 'We believe in the return of Christ and the eternal hope of all who believe.' },
];

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: 'What time are your Sunday services?',
    answer: 'We have two services every Sunday at 9:00 AM and 11:30 AM. Both include live worship and a message. Children\u2019s ministry runs during both services.',
  },
  {
    question: 'Do I need to be a member to attend?',
    answer: 'Not at all! Everyone is welcome. Whether you\u2019re exploring faith for the first time or looking for a church home, you belong here.',
  },
  {
    question: 'What should I wear?',
    answer: 'Come as you are. You\u2019ll see everything from jeans to Sunday best. We care about your heart, not your outfit.',
  },
  {
    question: 'Is there something for my kids?',
    answer: 'Yes! Our Children\u2019s Ministry provides a safe, fun environment for kids from birth through 5th grade during both Sunday services.',
  },
  {
    question: 'How can I get involved?',
    answer: 'Start by attending a Sunday service, then check out our Ministries page or sign up for a Small Group. We\u2019d love to help you find your place.',
  },
  {
    question: 'How do I become a member?',
    answer: 'We offer a membership class every quarter. Watch the announcements or contact us to find out when the next one is scheduled.',
  },
];

export const dailyVerses = [
  { text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.', ref: 'Jeremiah 29:11' },
  { text: 'Trust in the Lord with all your heart and lean not on your own understanding.', ref: 'Proverbs 3:5' },
  { text: 'I can do all things through Christ who strengthens me.', ref: 'Philippians 4:13' },
  { text: 'The Lord is my shepherd; I shall not want.', ref: 'Psalm 23:1' },
  { text: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', ref: 'Joshua 1:9' },
  { text: 'Love the Lord your God with all your heart and with all your soul and with all your mind.', ref: 'Matthew 22:37' },
  { text: 'Cast all your anxiety on him because he cares for you.', ref: '1 Peter 5:7' },
];

export const memoryVerse = {
  text: 'And let us consider how we may spur one another on toward love and good deeds, not giving up meeting together, as some are in the habit of doing, but encouraging one another.',
  ref: 'Hebrews 10:24\u201325',
};

export interface SmallGroup {
  name: string;
  day: string;
  time: string;
  location: string;
  leader: string;
}

export const smallGroups: SmallGroup[] = [
  { name: 'Northside Young Adults', day: 'Tuesday', time: '7:00 PM', location: 'TNC Room 204', leader: 'Daniel Okafor' },
  { name: 'Married Couples', day: 'Wednesday', time: '7:00 PM', location: 'TNC Room 102', leader: 'Pastor David & Sarah' },
  { name: 'Men\u2019s Discipleship', day: 'Thursday', time: '6:30 AM', location: 'TNC Fellowship Hall', leader: 'Tony Eze' },
  { name: 'Women of Faith', day: 'Friday', time: '6:30 PM', location: 'TNC Room 108', leader: 'Pastor Sarah Okoye' },
  { name: 'New Believers Class', day: 'Sunday', time: '9:00 AM', location: 'TNC Room 201', leader: 'Pastor Michael Adeyemi' },
  { name: 'Prayer & Intercession', day: 'Wednesday', time: '6:00 AM', location: 'TNC Main Auditorium', leader: 'Funmi Adeleke' },
];

export const announcements = [
  { title: 'Water Baptism Sunday', date: 'July 28', text: 'Sign up at the info desk if you\u2019d like to be baptized.' },
  { title: 'Volunteer Drive', date: 'August 3', text: 'Join a team and serve with us. Orientation after second service.' },
  { title: 'Back to School Giveaway', date: 'August 25', text: 'Donating school supplies for local families. Drop off at the lobby.' },
];
