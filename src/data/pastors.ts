export interface Pastor {
  id?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: { label: string; url: string; icon: string }[];
}

export const pastors: Pastor[] = [

];
