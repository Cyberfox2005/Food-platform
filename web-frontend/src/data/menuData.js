import spicyBurger from '../assets/spicy_burger.png';
import veggieBurger from '../assets/veggie_burger.png';
import classicBurger from '../assets/classic_burger.png';
// Placeholders for now, will generate these
import wingsImg from '../assets/wings.png';
import friesImg from '../assets/fries.png';
import lavaImg from '../assets/lava_cake.png';
import cosmicShakeImg from '../assets/cosmic_shake.png';

export const categories = [
  { id: 'all', name: 'All Specialties' },
  { id: 'mains', name: 'Main Course' },
  { id: 'sides', name: 'Star-Sides' },
  { id: 'desserts', name: 'Sweet Supernovas' },
  { id: 'drinks', name: 'Zero-G Drinks' }
];

export const products = [
  {
    id: 1,
    name: 'Supernova Spicy',
    description: 'Ghost pepper aioli, smoked habanero cheese, and meteor-charred wagyu.',
    price: 18,
    category: 'mains',
    image: spicyBurger,
    dietary: ['Spicy'],
    rating: 4.8,
    reviewsCount: 124
  },
  {
    id: 2,
    name: 'Nebula Veggie',
    description: 'Organic plant-based patty with forest-foraged mushrooms and astral truffle oil.',
    price: 16,
    category: 'mains',
    image: veggieBurger,
    dietary: ['Vegetarian'],
    rating: 4.6,
    reviewsCount: 89
  },
  {
    id: 3,
    name: 'Galactic Classic',
    description: 'Triple-aged cheddar, heritage brisket blend, and our proprietary zero-G sauce.',
    price: 14,
    category: 'mains',
    image: classicBurger,
    dietary: [],
    rating: 4.9,
    reviewsCount: 256
  },
  {
    id: 4,
    name: 'Meteor Wings',
    description: 'Crispy wings tossed in star-dust dry rub or supernova hot sauce.',
    price: 12,
    category: 'sides',
    image: wingsImg,
    dietary: ['Spicy'],
    rating: 4.7,
    reviewsCount: 167
  },
  {
    id: 5,
    name: 'Comet Fries',
    description: 'Truffle-infused gold potatoes with moon-salt crystals.',
    price: 8,
    category: 'sides',
    image: friesImg,
    dietary: ['Vegetarian', 'Gluten-Free'],
    rating: 4.5,
    reviewsCount: 312
  },
  {
    id: 6,
    name: 'Chocolate Black Hole',
    description: 'Deep dark chocolate lava cake with a molten core and lunar sugar.',
    price: 10,
    category: 'desserts',
    image: lavaImg,
    dietary: ['Vegetarian'],
    rating: 4.9,
    reviewsCount: 143
  },
  {
    id: 7,
    name: 'Nebula Milkshake',
    description: 'Swirled berry and vanilla galaxy shake topped with popping stardust.',
    price: 9,
    category: 'drinks',
    image: cosmicShakeImg,
    dietary: ['Vegetarian', 'Gluten-Free'],
    rating: 4.8,
    reviewsCount: 95
  }
];
