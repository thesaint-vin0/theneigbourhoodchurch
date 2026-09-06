export interface Pastor {
  id?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: { label: string; url: string; icon: string }[];
}

export const pastors: Pastor[] = [
  {
    name: 'Pastor Olanrenwaju Saba ',
    role: 'Lead Pastor',
    bio: 'Pastor Saba founded The Neighbourhood Church in 2008 with a vision to create a community where everyone feels they belong. With over 20 years of ministry experience, he brings warmth, wisdom, and a deep love for people.',
    image: 'https:1043471.s&cs=tinysrgb&w=800',
    socials: [
      { label: 'Twitter', url: '#', icon: 'twitter' },
      { label: 'Instagram', url: '#', icon: 'instagram' },
      { label: 'Facebook', url: '#', icon: 'facebook' },
    ],
  },
  {
    name: 'Pastor ',
    role: 'Associate Pastor',
    bio: 'Pastor  leads our women\u2019s ministry and oversees pastoral care. Her compassionate heart and gift of teaching have touched countless lives across our community.',
    image: 'hotoompress&cs=tinysrgb&w=800',
    socials: [
      { label: 'Twitter', url: '#', icon: 'twitter' },
      { label: 'Instagram', url: '#', icon: 'instagram' },
      { label: 'Facebook', url: '#', icon: 'facebook' },
    ],
  },
  {
    name: 'Pastor ',
    role: 'Youth Pastor',
    bio: 'Pastor  leads our vibrant youth ministry with energy and passion. He is dedicated to helping young people discover their identity and purpose in Christ.',
    image: 'httpsphoto-2182970.jpeg?auto=compress&cs=tinysrgb&w=800',
    socials: [
      { label: 'Twitter', url: '#', icon: 'twitter' },
      { label: 'Instagram', url: '#', icon: 'instagram' },
    ],
  },
  {
    name: 'Pastor ',
    role: 'Worship Pastor',
    bio: 'Pastor  oversees worship and the creative arts. Her heart for God\u2019s presence creates an atmosphere where people encounter the love of the Father.',
    image: 'h-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800',
    socials: [
      { label: 'Instagram', url: '#', icon: 'instagram' },
      { label: 'Facebook', url: '#', icon: 'facebook' },
    ],
  },
];
