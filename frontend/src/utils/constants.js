export const FOOD_CATEGORIES = [
  { id: 'vegetables', label: 'Vegetables', icon: '🥬' },
  { id: 'fruits', label: 'Fruits', icon: '🍎' },
  { id: 'grains', label: 'Grains & Bread', icon: '🍞' },
  { id: 'dairy', label: 'Dairy Products', icon: '🥛' },
  { id: 'meat', label: 'Meat & Protein', icon: '🥩' },
  { id: 'cooked', label: 'Cooked Meals', icon: '🍲' },
  { id: 'snacks', label: 'Snacks', icon: '🍪' },
  { id: 'other', label: 'Other', icon: '📦' },
]

export const NGO_LIST = [
  {
    id: 1,
    name: 'Food for All India',
    phone: '+91 9876543210',
    email: 'contact@foodforall.org',
    address: 'New Delhi, India',
    description: 'Dedicated to reducing food waste and feeding the needy',
    focus: 'Community feeding programs',
  },
  {
    id: 2,
    name: 'Hunger Relief Foundation',
    phone: '+91 9123456789',
    email: 'help@hungerrelief.org',
    address: 'Mumbai, India',
    description: 'Working towards food security and nutrition',
    focus: 'Food distribution & nutrition programs',
  },
  {
    id: 3,
    name: 'Green Earth Initiative',
    phone: '+91 8765432109',
    email: 'info@greenearthorg.in',
    address: 'Bangalore, India',
    description: 'Focus on sustainable food waste management',
    focus: 'Waste reduction & sustainability',
  },
  {
    id: 4,
    name: 'Community Care Network',
    phone: '+91 7654321098',
    email: 'support@communitycare.org',
    address: 'Chennai, India',
    description: 'Supporting vulnerable populations with food aid',
    focus: 'Direct food assistance & community support',
  },
  {
    id: 5,
    name: 'Meal Share Program',
    phone: '+91 6543210987',
    email: 'hello@mealshare.in',
    address: 'Kolkata, India',
    description: 'Connecting donors with recipients in real-time',
    focus: 'Digital food sharing platform',
  },
]

export const FOOD_WASTE_STATS = [
  {
    label: 'Global Food Waste',
    value: '1.3 Billion Tonnes',
    description: 'Food wasted annually worldwide',
  },
  {
    label: 'Population Affected',
    value: '828 Million',
    description: 'People suffering from hunger globally',
  },
  {
    label: 'Economic Loss',
    value: '$408 Billion',
    description: 'Annual economic impact of food waste',
  },
  {
    label: 'Carbon Footprint',
    value: '4.4 Gt CO2',
    description: 'Greenhouse gases from food waste',
  },
]

export const LISTING_STATUS = {
  AVAILABLE: 'available',
  CLAIMED: 'claimed',
  EXPIRED: 'expired',
}
