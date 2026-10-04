export interface Photo {
  id: string;
  src: string;
  alt: string;
  room: string;
}

export interface Amenity {
  icon: string;
  label: string;
  description?: string;
  unavailable?: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  location: string;
  date: string;
  rating: number;
  text: string;
}

export interface Host {
  name: string;
  avatar: string;
  joinedYear: string;
  isSuperhost: boolean;
  reviewCount: number;
  rating: number;
  responseRate: string;
  responseTime: string;
  about: string;
}

export const LISTING = {
  title: 'Romantic Jacuzzi 1BHK Candolim | Mirashya UG10',
  tagline: 'Entire serviced apartment hosted by Mirashya',
  location: 'Candolim, Goa, India',
  rating: 4.97,
  reviewCount: 185,
  guests: 2,
  bedrooms: 1,
  beds: 1,
  baths: 1,
  price: 8500,
  priceUSD: 103,
  cleaningFee: 850,
  serviceFee: 1275,
  minNights: 2,
  maxGuests: 2,
  checkin: 'After 2:00 PM',
  checkout: '11:00 AM',
  description: `Step into romance at Mirashya UG10 – your private jacuzzi suite in the heart of Candolim, North Goa. This intimate 1BHK apartment is designed for couples seeking a luxurious yet cosy retreat.

The bedroom features a plush king-sized bed and the private jacuzzi is right inside the apartment – perfect for a relaxing soak after a day at the beach. The fully equipped kitchenette lets you whip up a quick breakfast or a late-night snack.

Just a 5-minute drive to Candolim Beach and close to the best restaurants, clubs, and markets that Goa has to offer. Whether you're here for a honeymoon, anniversary, or just a romantic getaway, Mirashya UG10 will make it unforgettable.`,
  highlights: [
    { icon: 'star', title: 'Superhost', subtitle: 'Superhosts are experienced, highly rated hosts.' },
    { icon: 'key', title: 'Self check-in', subtitle: 'Check yourself in with the smart lock.' },
    { icon: 'location', title: 'Great location', subtitle: '95% of recent guests gave the location a 5-star rating.' },
  ],
};

export const PHOTOS: Photo[] = [
  // Living Room
  {
    id: 'lr1',
    src: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&q=80',
    alt: 'Bright modern living room with jacuzzi',
    room: 'Living Room / Jacuzzi',
  },
  {
    id: 'lr2',
    src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    alt: 'Living room with sofa and TV',
    room: 'Living Room / Jacuzzi',
  },
  {
    id: 'lr3',
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    alt: 'Jacuzzi closeup in apartment',
    room: 'Living Room / Jacuzzi',
  },
  // Bedroom
  {
    id: 'br1',
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
    alt: 'King bedroom with luxury bedding',
    room: 'Bedroom',
  },
  {
    id: 'br2',
    src: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&q=80',
    alt: 'Cozy bedroom interior',
    room: 'Bedroom',
  },
  {
    id: 'br3',
    src: 'https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=1200&q=80',
    alt: 'Bedroom with ensuite',
    room: 'Bedroom',
  },
  // Bathroom
  {
    id: 'ba1',
    src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
    alt: 'Modern bathroom with rainfall shower',
    room: 'Bathroom',
  },
  {
    id: 'ba2',
    src: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=1200&q=80',
    alt: 'Bathroom amenities',
    room: 'Bathroom',
  },
  // Kitchen
  {
    id: 'ki1',
    src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    alt: 'Kitchenette with modern appliances',
    room: 'Kitchen',
  },
  {
    id: 'ki2',
    src: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=80',
    alt: 'Kitchen dining area',
    room: 'Kitchen',
  },
];

export const AMENITIES: Amenity[] = [
  { icon: 'pool', label: 'Private jacuzzi', description: 'Inside the apartment' },
  { icon: 'wifi', label: 'Wifi', description: 'Dedicated workspace' },
  { icon: 'tv', label: 'TV', description: 'Netflix, Prime Video' },
  { icon: 'ac', label: 'Air conditioning' },
  { icon: 'kitchen', label: 'Kitchen', description: 'Space where guests can cook their own meals' },
  { icon: 'washer', label: 'Washing machine', description: 'In a separate space, for guests use' },
  { icon: 'parking', label: 'Free parking on premises' },
  { icon: 'security', label: '24-hour security' },
  { icon: 'elevator', label: 'Elevator' },
  { icon: 'checkin', label: 'Self check-in', description: 'Smart lock' },
  { icon: 'workspace', label: 'Dedicated workspace' },
  { icon: 'bathtub', label: 'Bathtub', unavailable: false },
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Priya',
    avatar: 'https://i.pravatar.cc/64?img=1',
    location: 'Mumbai, India',
    date: 'March 2024',
    rating: 5,
    text: 'Absolutely stunning place! The jacuzzi was a dream and the location is fantastic. Mirashya was an amazing host – very responsive and helpful. Will definitely come back!',
  },
  {
    id: 'r2',
    author: 'Rohit',
    avatar: 'https://i.pravatar.cc/64?img=2',
    location: 'Bangalore, India',
    date: 'February 2024',
    rating: 5,
    text: 'Perfect romantic getaway! The apartment was spotless and exactly as shown in the photos. The jacuzzi was clean and worked perfectly. Great value for money in Goa.',
  },
  {
    id: 'r3',
    author: 'Sarah',
    avatar: 'https://i.pravatar.cc/64?img=3',
    location: 'London, UK',
    date: 'January 2024',
    rating: 5,
    text: 'We had the most romantic stay here! Mirashya is an excellent host and the apartment is beautifully designed. The jacuzzi is the highlight – we used it every single night.',
  },
  {
    id: 'r4',
    author: 'Karan',
    avatar: 'https://i.pravatar.cc/64?img=4',
    location: 'Delhi, India',
    date: 'December 2023',
    rating: 5,
    text: 'Exceptional property! Everything was perfect – cleanliness, amenities, and location. The host was very accommodating. We celebrated our anniversary here and it was magical.',
  },
  {
    id: 'r5',
    author: 'Anjali',
    avatar: 'https://i.pravatar.cc/64?img=5',
    location: 'Pune, India',
    date: 'November 2023',
    rating: 5,
    text: 'A truly special place. The jacuzzi suite is unlike anything else in Goa. Super clean, great AC, lovely decor. The neighbourhood is peaceful yet very close to the beach.',
  },
  {
    id: 'r6',
    author: 'James',
    avatar: 'https://i.pravatar.cc/64?img=6',
    location: 'Singapore',
    date: 'October 2023',
    rating: 4,
    text: 'Lovely apartment with a fantastic jacuzzi. The host was very helpful and quick to respond. Great location in Candolim. Would recommend to any couple looking for a romantic Goa trip.',
  },
];

export const HOST: Host = {
  name: 'Mirashya',
  avatar: 'https://i.pravatar.cc/128?img=25',
  joinedYear: '2019',
  isSuperhost: true,
  reviewCount: 312,
  rating: 4.97,
  responseRate: '100%',
  responseTime: 'Within an hour',
  about: "Hi! I'm Mirashya, a passionate host who loves making people feel at home in beautiful Goa. I manage a few luxury properties in North Goa and take pride in offering clean, stylish, and comfortable stays for every guest.",
};
