import { MenuItem, MockOrder } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Signature Fudgy ✨
  {
    id: 'fudgy-1',
    name: 'Triple Chocolate Fudgy Box',
    price: 249,
    description: 'Our crowned masterpiece. A dense, ultra-fudgy dark chocolate brownie base generously studded with hand-cut chunks of premium Belgian dark, rich milk, and velvety white chocolate.',
    category: 'fudgy',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    tag: 'Bestseller ✨',
    features: ['100% Eggless', 'Belgian Chocolate Triad', 'Signature Flaky Crust', 'Bespoke Micro-Batch']
  },
  {
    id: 'fudgy-2',
    name: 'Classic Pure Fudgy Box',
    price: 199,
    description: 'The pure, unadulterated gold standard. Intensely rich, deeply chocolatey cocoa solids slow-whipped and baked to perfect dense, chewy, and crinkle-topped luxury.',
    category: 'fudgy',
    image: 'https://images.unsplash.com/photo-1600172454520-13e21814eed3?auto=format&fit=crop&w=800&q=80',
    tag: 'Classic Gold 🌟',
    features: ['100% Eggless', 'High-Cocoa Solids', 'Gooey Center', 'Authentic French Method']
  },
  {
    id: 'fudgy-3',
    name: 'Gooey Dark Chocolate Box',
    price: 299,
    description: 'For the ultimate cocoa devotee. Liquid gold lava center of 74% single-origin dark chocolate that flows gracefully when warmed, framed by a delicate crisp crust.',
    category: 'fudgy',
    image: 'https://images.unsplash.com/photo-1589111406600-7161b47793d0?auto=format&fit=crop&w=800&q=80',
    tag: 'Intense 🍫',
    features: ['100% Eggless', '74% Single-Origin Cocoa', 'Molten Core', 'Recommended Warm']
  },
  {
    id: 'fudgy-4',
    name: 'Velvet Ribbon Crimson Box',
    price: 279,
    description: 'A majestic red velvet brownie fused with luscious white chocolate chips, layered with a hint of organic vanilla and premium cocoa for a velvet-smooth crinkle bite.',
    category: 'fudgy',
    image: 'https://images.unsplash.com/photo-1615830098779-1be32e60cca0?auto=format&fit=crop&w=800&q=80',
    tag: 'New Debut 🎀',
    features: ['100% Eggless', 'Premium Red Cocoa', 'Velvety White Chips', 'Crinkle Top Elegance']
  },
  {
    id: 'fudgy-5',
    name: 'Roasted Nut Harvest Box',
    price: 289,
    description: 'A chocolate lover\'s rustic luxury. Rich fudgy chocolate brownie loaded with freshly roasted hazelnuts, almonds, and walnuts for a crunchy, golden-toasted finish.',
    category: 'fudgy',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80',
    tag: 'Nutty Luxury 🌰',
    features: ['100% Eggless', 'Slow-Roasted Nuts Trio', 'Deep Fudgy Texture', 'No Artificial Flavoring']
  },
  // Deep-Dish Tubs 🔥
  {
    id: 'tub-1',
    name: 'Deep-Dish Overloaded Chocolate Tub',
    price: 499,
    description: 'A decadent vertical theater of chocolate. Layers of our signature fudgy brownie base, luxurious cold-pressed Belgian ganache, and crispy dark chocolate pearls in a premium reusable glass tub.',
    category: 'tubs',
    image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=800&q=80',
    tag: 'Crowd Favorite 🔥',
    features: ['100% Eggless', 'Velvet Ganache Layers', 'Crispy Cocoa Pearls', 'Shareable Luxury Size']
  },
  {
    id: 'tub-2',
    name: 'Deep-Dish Caramel Drizzle Tub',
    price: 549,
    description: 'Indulgent vertical layers of classic fudgy brownie, house-made salted caramel drizzle, toasted pecan pieces, and silk milk chocolate ganache in a premium reusable glass tub.',
    category: 'tubs',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
    tag: 'Gourmet Special 🍮',
    features: ['100% Eggless', 'House-crafted Salted Caramel', 'Toasted Pecan Crunch', 'Ultra-Rich Layering']
  },
  // Nutritious Loaves 🌿
  {
    id: 'loaf-1',
    name: 'Oats Honey Almond Loaf',
    price: 349,
    description: 'Symphony of health and taste. Sweetened exclusively with raw organic wildflower honey, infused with stone-ground rolled oats, and crowned with toasted California almonds.',
    category: 'loaves',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=800&q=80',
    tag: 'Healthy Living 🌿',
    features: ['100% Eggless', 'Zero Refined Sugar', '100% Rolled Oats Flour', 'Raw Wildflower Honey']
  },
  {
    id: 'loaf-2',
    name: 'Ragi Walnut Country Loaf',
    price: 329,
    description: 'A nutty, rustic luxury loaf baked with slow-fermented finger millet (Ragi), loaded with rich Omega-3 packed premium walnuts, and sweetened with organic country jaggery.',
    category: 'loaves',
    image: 'https://images.unsplash.com/photo-1605697040924-852290f6b0d5?auto=format&fit=crop&w=800&q=80',
    tag: 'Rustic Wellness 🌾',
    features: ['100% Eggless', 'Organic Finger Millet', 'California Walnuts', 'Pure Desi Jaggery']
  },
  {
    id: 'loaf-3',
    name: 'Multimillet Crust Almond Loaf',
    price: 359,
    description: 'A nutrient-dense grain wonder baked with a blend of ancient finger, pearl, and foxtail millets, topped with crunchy toasted almond flakes and organic wildflower honey.',
    category: 'loaves',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    tag: 'Supergrain 🌾',
    features: ['100% Eggless', 'Foxtail & Pearl Millet Blend', 'Toasted Almond Crust', 'Wildflower Honey infusion']
  },
  {
    id: 'loaf-4',
    name: 'Postnatal Lactation Organic Box',
    price: 399,
    description: 'Carefully curated traditional wellness for new mothers. Infused with organic Shatavari, fenugreek, flax seeds, native cow ghee, and natural jaggery in a soft-baked therapeutic bite.',
    category: 'loaves',
    image: 'https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?auto=format&fit=crop&w=800&q=80',
    tag: 'Motherhood Special ❤️',
    features: ['100% Eggless', 'Ayurvedic Botanical Blend', 'Organic Garden Seeds', 'Pure Native Cow Ghee']
  }
];

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: 'FBB-2026-9041',
    customerName: 'Aishwarya Samal',
    mobile: '9876543210',
    pincode: '560001',
    address: 'Flat 402, Prestige Hermitage, Kensington Road, Bangalore, Karnataka',
    items: [
      { name: 'Triple Chocolate Fudgy Box', quantity: 2, price: 249 },
      { name: 'Overloaded Chocolate Tub', quantity: 1, price: 499 }
    ],
    totalAmount: 997,
    status: 'Pending',
    date: '2026-06-26'
  },
  {
    id: 'FBB-2026-9042',
    customerName: 'Devendra Kulkarni',
    mobile: '9488411471',
    pincode: '400001',
    address: '12, Ocean View Apartments, Marine Drive, Mumbai, Maharashtra',
    items: [
      { name: 'Classic Pure Fudgy Box', quantity: 1, price: 199 },
      { name: 'Oats Honey Almond Loaf', quantity: 2, price: 349 }
    ],
    totalAmount: 897,
    status: 'Shipped',
    date: '2026-06-25'
  },
  {
    id: 'FBB-2026-9043',
    customerName: 'Rohit Sharma',
    mobile: '7302456789',
    pincode: '110001',
    address: 'House 45, Golf Links Estates, New Delhi',
    items: [
      { name: 'Postnatal Lactation Box', quantity: 1, price: 399 },
      { name: 'Ragi Walnut Country Loaf', quantity: 1, price: 329 }
    ],
    totalAmount: 728,
    status: 'Delivered',
    date: '2026-06-24'
  },
  {
    id: 'FBB-2026-9044',
    customerName: 'Ananya Sen',
    mobile: '8822446688',
    pincode: '700019',
    address: 'Ballygunge Circular Road, Flat 3B, Kolkata, West Bengal',
    items: [
      { name: 'Gooey Dark Chocolate Box', quantity: 3, price: 299 }
    ],
    totalAmount: 897,
    status: 'Pending',
    date: '2026-06-26'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Prerna Mehta',
    role: 'Connoisseur & Food Writer',
    quote: 'Absolutely life-changing brownies! I couldn\'t believe they were 100% eggless. The Triple Chocolate Fudgy Box is pure heaven, dense, moist, and perfectly balanced. Truly elite.',
    rating: 5,
    location: 'Mumbai'
  },
  {
    name: 'Siddharth Roy',
    role: 'Fitness Coach & Athlete',
    quote: 'The Oats Honey Almond Loaf is my daily post-workout luxury. Zero refined sugar, pure rolled oats, yet it feels completely decadent. Fahis has cracked the code of healthy indulgence.',
    rating: 5,
    location: 'Bangalore'
  },
  {
    name: 'Meera Deshmukh',
    role: 'New Mother',
    quote: 'The Postnatal Lactation Box has been a blessing. It is delicious, comforting, and filled with natural wellness ingredients. Highly recommend to all new moms looking for healthy ghee-baked items.',
    rating: 5,
    location: 'Pune'
  }
];
