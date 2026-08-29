export interface NavLink {
  label: string;
  path: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Our Pastors', path: '/pastors' },
  { label: 'Ministries', path: '/ministries' },
  { label: 'Sermons', path: '/sermons' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Giving', path: '/giving' },
  { label: 'Prayer', path: '/prayer' },
  { label: 'Contact', path: '/contact' },
];
