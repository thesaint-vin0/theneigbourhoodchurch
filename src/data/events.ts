export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: string;
  registrationRequired: boolean;
}

export const events: ChurchEvent[] = [
  {
    id: 'e1',
    title: 'Summer Worship Night',
    date: '2026-08-15',
    time: '7:00 PM',
    location: 'TNC Main Auditorium',
    description: 'An evening of uninterrupted worship, prayer, and communion. All are welcome to join us as we seek God\u2019s presence together.',
    image: 'https://images.pexels.com/photos/4330187/pexels-photo-4330187.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Worship',
    registrationRequired: false,
  },
  {
    id: 'e2',
    title: 'Family Conference 2026',
    date: '2026-09-20',
    endDate: '2026-09-22',
    time: '9:00 AM',
    location: 'TNC Main Auditorium',
    description: 'A three-day conference for families and couples featuring guest speakers, workshops, and fellowship.',
    image: 'https://images.pexels.com/photos/2564688/pexels-photo-2564688.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Conference',
    registrationRequired: true,
  },
  {
    id: 'e3',
    title: 'Youth Night: Unstoppable',
    date: '2026-08-02',
    time: '6:30 PM',
    location: 'TNC Youth Hall',
    description: 'A high-energy night for teens with games, live music, and a powerful message. Bring a friend!',
    image: 'https://images.pexels.com/photos/8434662/pexels-photo-8434662.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Youth',
    registrationRequired: true,
  },
  {
    id: 'e4',
    title: 'Women\u2019s Brunch & Fellowship',
    date: '2026-08-09',
    time: '10:00 AM',
    location: 'TNC Fellowship Hall',
    description: 'A morning of food, friendship, and faith. Our guest speaker will share on finding identity in Christ.',
    image: 'https://images.pexels.com/photos/2689728/pexels-photo-2689728.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Women',
    registrationRequired: true,
  },
  {
    id: 'e5',
    title: 'Men\u2019s Breakfast',
    date: '2026-08-08',
    time: '8:00 AM',
    location: 'TNC Fellowship Hall',
    description: 'Men gather for a hearty breakfast, real conversation, and a short devotional. Newcomers always welcome.',
    image: 'https://images.pexels.com/photos/2564688/pexels-photo-2564688.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Men',
    registrationRequired: false,
  },
  {
    id: 'e6',
    title: 'Community Outreach Day',
    date: '2026-08-30',
    time: '11:00 AM',
    location: 'City Centre Plaza',
    description: 'Join us as we serve our city with free food, clothing, medical check-ups, and prayer.',
    image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Outreach',
    registrationRequired: true,
  },
];

export const eventCategories = ['All', 'Worship', 'Conference', 'Youth', 'Women', 'Men', 'Outreach'];
