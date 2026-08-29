export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  category: string;
  image: string;
  videoId?: string;
}

export const galleryItems: GalleryItem[] = [
  { id: 'g1', type: 'photo', title: 'Sunday Worship Service', category: 'Services', image: 'https://images.pexels.com/photos/4330187/pexels-photo-4330187.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'g2', type: 'photo', title: 'Community Outreach', category: 'Outreach', image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'g3', type: 'photo', title: 'Youth Conference', category: 'Conferences', image: 'https://images.pexels.com/photos/8434662/pexels-photo-8434662.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'g4', type: 'photo', title: 'Women\u2019s Fellowship', category: 'Fellowship', image: 'https://images.pexels.com/photos/2689728/pexels-photo-2689728.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'g5', type: 'photo', title: 'Baptism Sunday', category: 'Services', image: 'https://images.pexels.com/photos/8434631/pexels-photo-8434631.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'g6', type: 'photo', title: 'Choir Performance', category: 'Worship', image: 'https://images.pexels.com/photos/4330187/pexels-photo-4330187.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'g7', type: 'photo', title: 'Prayer Meeting', category: 'Fellowship', image: 'https://images.pexels.com/photos/8108065/pexels-photo-8108065.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'g8', type: 'photo', title: 'Kids Ministry', category: 'Fellowship', image: 'https://images.pexels.com/photos/8434631/pexels-photo-8434631.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'g9', type: 'photo', title: 'Conference Stage', category: 'Conferences', image: 'https://images.pexels.com/photos/2698849/pexels-photo-2698849.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'g10', type: 'photo', title: 'Worship Night', category: 'Worship', image: 'https://images.pexels.com/photos/4330187/pexels-photo-4330187.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'g11', type: 'photo', title: 'Outreach Food Drive', category: 'Outreach', image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'g12', type: 'photo', title: 'Young Adults Gather', category: 'Fellowship', image: 'https://images.pexels.com/photos/2564688/pexels-photo-2564688.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

export const galleryCategories = ['All', 'Services', 'Worship', 'Outreach', 'Conferences', 'Fellowship'];
