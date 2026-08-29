export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  category: string;
  scripture: string;
  description: string;
  image: string;
  youtubeId: string;
  audioUrl: string;
  notesUrl: string;
  featured: boolean;
}

export const sermons: Sermon[] = [
  {
    id: 's1',
    title: 'The Grace That Finds You',
    speaker: 'Pastor David Okoye',
    date: '2026-07-12',
    category: 'Grace',
    scripture: 'Ephesians 2:8\u20139',
    description: 'No matter how far you\u2019ve wandered, God\u2019s grace is already on its way to meet you where you are.',
    image: 'https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg?auto=compress&cs=tinysrgb&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    audioUrl: '#',
    notesUrl: '#',
    featured: true,
  },
  {
    id: 's2',
    title: 'Belonging Before Believing',
    speaker: 'Pastor Sarah Okoye',
    date: '2026-07-05',
    category: 'Community',
    scripture: 'Romans 15:7',
    description: 'We explore what it means to welcome others the way Christ welcomed us \u2014 fully and unconditionally.',
    image: 'https://images.pexels.com/photos/2698849/pexels-photo-2698849.jpeg?auto=compress&cs=tinysrgb&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    audioUrl: '#',
    notesUrl: '#',
    featured: false,
  },
  {
    id: 's3',
    title: 'Faith That Moves Mountains',
    speaker: 'Pastor Michael Adeyemi',
    date: '2026-06-28',
    category: 'Faith',
    scripture: 'Matthew 17:20',
    description: 'A message on the power of even the smallest seed of faith when planted in God\u2019s promises.',
    image: 'https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg?auto=compress&cs=tinysrgb&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    audioUrl: '#',
    notesUrl: '#',
    featured: false,
  },
  {
    id: 's4',
    title: 'The Heart of Worship',
    speaker: 'Pastor Grace Bello',
    date: '2026-06-21',
    category: 'Worship',
    scripture: 'John 4:23\u201324',
    description: 'True worship is not about a song but about a life surrendered to the Father.',
    image: 'https://images.pexels.com/photos/4330187/pexels-photo-4330187.jpeg?auto=compress&cs=tinysrgb&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    audioUrl: '#',
    notesUrl: '#',
    featured: false,
  },
  {
    id: 's5',
    title: 'Hope in the Hard Seasons',
    speaker: 'Pastor David Okoye',
    date: '2026-06-14',
    category: 'Hope',
    scripture: 'Romans 5:3\u20135',
    description: 'How to hold on to hope when life feels uncertain, and why suffering produces endurance.',
    image: 'https://images.pexels.com/photos/2698849/pexels-photo-2698849.jpeg?auto=compress&cs=tinysrgb&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    audioUrl: '#',
    notesUrl: '#',
    featured: false,
  },
  {
    id: 's6',
    title: 'Love That Never Fails',
    speaker: 'Pastor Sarah Okoye',
    date: '2026-06-07',
    category: 'Love',
    scripture: '1 Corinthians 13:8',
    description: 'A deep dive into the enduring nature of God\u2019s love and how we are called to reflect it.',
    image: 'https://images.pexels.com/photos/2889440/pexels-photo-2889440.jpeg?auto=compress&cs=tinysrgb&w=800',
    youtubeId: 'dQw4w9WgXcQ',
    audioUrl: '#',
    notesUrl: '#',
    featured: false,
  },
];

export const sermonCategories = ['All', 'Grace', 'Faith', 'Hope', 'Love', 'Worship', 'Community'];
