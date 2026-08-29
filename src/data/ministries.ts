export interface Ministry {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  image: string;
  leader: string;
  meetingTime: string;
}

export const ministries: Ministry[] = [
  {
    slug: 'children',
    name: 'Children\u2019s Ministry',
    tagline: 'Nurturing little hearts with big love',
    description: 'Our Children\u2019s Ministry provides a safe, fun, and faith-filled environment where kids from birth to 5th grade learn about God\u2019s love through interactive lessons, worship, and play.',
    icon: 'baby',
    image: 'https://images.pexels.com/photos/8434631/pexels-photo-8434631.jpeg?auto=compress&cs=tinysrgb&w=800',
    leader: 'Mrs. Amaka Johnson',
    meetingTime: 'Sundays, 10:00 AM',
  },
  {
    slug: 'youth',
    name: 'Youth Ministry',
    tagline: 'Raising a generation of world-changers',
    description: 'A dynamic community for teens in grades 6\u201312. We tackle real-life topics, build lasting friendships, and grow in faith through small groups, events, and service.',
    icon: 'flame',
    image: 'https://images.pexels.com/photos/8434662/pexels-photo-8434662.jpeg?auto=compress&cs=tinysrgb&w=800',
    leader: 'Pastor Michael Adeyemi',
    meetingTime: 'Fridays, 6:30 PM',
  },
  {
    slug: 'young-adults',
    name: 'Young Adults',
    tagline: 'Faith, friendship, and purpose',
    description: 'For ages 18\u201330, our Young Adults ministry gathers for Bible study, social events, and meaningful conversations about navigating life with faith.',
    icon: 'users',
    image: 'https://images.pexels.com/photos/2564688/pexels-photo-2564688.jpeg?auto=compress&cs=tinysrgb&w=800',
    leader: 'Mr. Daniel Okafor',
    meetingTime: 'Tuesdays, 7:00 PM',
  },
  {
    slug: 'women',
    name: 'Women\u2019s Ministry',
    tagline: 'Strength, dignity, and sisterhood',
    description: 'A sisterhood of women growing in faith together through Bible studies, mentorship, retreats, and service projects that impact our community.',
    icon: 'heart',
    image: 'https://images.pexels.com/photos/2689728/pexels-photo-2689728.jpeg?auto=compress&cs=tinysrgb&w=800',
    leader: 'Pastor Sarah Okoye',
    meetingTime: '1st Saturday, 10:00 AM',
  },
  {
    slug: 'men',
    name: 'Men\u2019s Ministry',
    tagline: 'Building men of integrity and faith',
    description: 'We equip men to lead with courage and compassion through breakfasts, study groups, outdoor adventures, and mentorship.',
    icon: 'shield',
    image: 'https://images.pexels.com/photos/2564688/pexels-photo-2564688.jpeg?auto=compress&cs=tinysrgb&w=800',
    leader: 'Mr. Tony Eze',
    meetingTime: '2nd Saturday, 8:00 AM',
  },
  {
    slug: 'prayer-team',
    name: 'Prayer Team',
    tagline: 'Standing in the gap for our church and city',
    description: 'A dedicated team that gathers weekly to intercede for our church, community, and the world. Join us in person or online.',
    icon: 'hand',
    image: 'https://images.pexels.com/photos/8108065/pexels-photo-8108065.jpeg?auto=compress&cs=tinysrgb&w=800',
    leader: 'Mrs. Funmi Adeleke',
    meetingTime: 'Wednesdays, 6:00 AM & 9:00 PM',
  },
  {
    slug: 'choir',
    name: 'Choir & Worship',
    tagline: 'Leading hearts into His presence',
    description: 'Our choir and worship team lead the congregation into God\u2019s presence every Sunday. Auditions are open to singers and musicians.',
    icon: 'music',
    image: 'https://images.pexels.com/photos/4330187/pexels-photo-4330187.jpeg?auto=compress&cs=tinysrgb&w=800',
    leader: 'Pastor Grace Bello',
    meetingTime: 'Thursdays, 6:30 PM',
  },
  {
    slug: 'media-team',
    name: 'Media Team',
    tagline: 'Amplifying the message',
    description: 'From livestream to social media, our media team uses technology and creativity to share the gospel beyond our walls.',
    icon: 'video',
    image: 'https://images.pexels.com/photos/2698849/pexels-photo-2698849.jpeg?auto=compress&cs=tinysrgb&w=800',
    leader: 'Mr. Chidi Nwosu',
    meetingTime: 'Sundays, 8:00 AM',
  },
  {
    slug: 'evangelism',
    name: 'Evangelism',
    tagline: 'Sharing hope with every neighbour',
    description: 'We take the love of Jesus to the streets through outreach events, gospel tracts, and personal conversations.',
    icon: 'megaphone',
    image: 'https://images.pexels.com/photos/8434672/pexels-photo-8434672.jpeg?auto=compress&cs=tinysrgb&w=800',
    leader: 'Mr. Emeka Obi',
    meetingTime: 'Last Saturday, 11:00 AM',
  },
  {
    slug: 'community-outreach',
    name: 'Community Outreach',
    tagline: 'Loving our city in practical ways',
    description: 'Food drives, free medical clinics, school supply giveaways, and more \u2014 we serve our city because God first served us.',
    icon: 'gift',
    image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800',
    leader: 'Mrs. Ngozi Eze',
    meetingTime: 'Monthly, varies',
  },
];
