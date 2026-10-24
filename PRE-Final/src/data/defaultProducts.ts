import type { Product } from '../types/product';

export const PRESET_IMAGE_OPTIONS = [
  {
    name: 'Retro Wireless Speaker',
    url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
  },
  {
    name: 'Pastel Ceramic Matcha Mug',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    category: 'Home Essentials',
  },
  {
    name: 'Vintage Leather Desk Mat',
    url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    category: 'Office Supplies',
  },
  {
    name: 'Matte Sage Alarm Clock',
    url: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    category: 'Home Essentials',
  },
  {
    name: 'Aluminum Laptop Riser',
    url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    category: 'Office Supplies',
  },
  {
    name: 'Wireless Ergonomic Mouse',
    url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    category: 'Electronics',
  },
  {
    name: 'Linen Bound Daily Journal',
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
  },
  {
    name: 'Country Club Canvas Tote',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    category: 'Accessories',
  },
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Vintage Wooden Bluetooth Speaker',
    category: 'Electronics',
    price: 3450,
    quantity: 12,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    description:
      'Warm acoustic craftsmanship meets modern Bluetooth 5.3 streaming. Designed with a hand-finished wooden enclosure, spun brass rotary knobs, and rich 360-degree stereo sound that elevates any desktop or lounge.',
    specifications:
      'Dimensions: 210 x 115 x 135 mm | Weight: 1.4 kg | Battery: 16 hrs playback | Connectivity: Bluetooth 5.3 + 3.5mm AUX | Output: 20W RMS stereo',
    rating: 4.9,
    isFeatured: true,
    createdAt: '2026-03-01',
  },
  {
    id: 'prod-002',
    name: 'Handcrafted Ceramic Matcha & Latte Cup',
    category: 'Home Essentials',
    price: 890,
    quantity: 8,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description:
      'Individually thrown stoneware cup with a gentle two-tone pastel glaze. Perfectly proportioned for ceremonial matcha whisking or velvety morning cafe lattes, keeping beverages warm with a comfortable ergonomic rim.',
    specifications:
      'Capacity: 340 ml (11.5 oz) | Material: Lead-free artisan stoneware | Microwave & Dishwasher safe | Finish: Matte blush + cream dip',
    rating: 4.8,
    isFeatured: true,
    createdAt: '2026-03-02',
  },
  {
    id: 'prod-003',
    name: 'Minimalist Desk Organizer Caddy',
    category: 'Office Supplies',
    price: 1250,
    quantity: 3, // Low stock demo (< 5)
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    description:
      'Keep pens, stationery, cables, and sticky notes organized in tailored aesthetic harmony. Features partitioned beechwood dividers and a velvety weighted base lined with protective felt.',
    specifications:
      'Compartments: 5 modular sections | Material: Sustainable beechwood & matte powder-coated steel | Dimensions: 24 x 14 x 9 cm',
    rating: 4.7,
    isFeatured: false,
    createdAt: '2026-03-03',
  },
  {
    id: 'prod-004',
    name: 'Matte Sage Silent Alarm Clock',
    category: 'Home Essentials',
    price: 980,
    quantity: 15,
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    description:
      'Enjoy uninterrupted peaceful sleep with ultra-quiet sweeping quartz movement. Features twin top bells for a pleasant analog chime, a soft nightlight button, and a country-club sage matte metal finish.',
    specifications:
      'Movement: Ultra-silent sweep quartz | Power: 1x AA battery (included) | Material: Powder-coated iron frame & glass lens | Diameter: 10 cm',
    rating: 4.6,
    isFeatured: false,
    createdAt: '2026-03-04',
  },
  {
    id: 'prod-005',
    name: 'Ergonomic Aluminum Laptop Riser',
    category: 'Office Supplies',
    price: 2150,
    quantity: 2, // Low stock demo (< 5)
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    description:
      'Elevates your laptop to eye level for optimal posture and neck comfort. Crafted from sandblasted aerospace aluminum with anti-slip silicone cushions and open ventilation for peak heat dissipation.',
    specifications:
      'Compatibility: 10 to 17 inch laptops | Elevation: 15 cm fixed ergonomic tilt | Material: Sandblasted aluminum alloy | Load Capacity: 5 kg',
    rating: 4.9,
    isFeatured: true,
    createdAt: '2026-03-05',
  },
  {
    id: 'prod-006',
    name: 'Pastel Wireless Ergonomic Mouse',
    category: 'Electronics',
    price: 1680,
    quantity: 7,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    description:
      'A whisper-quiet click mouse contoured naturally to fit your palm. Offers seamless dual-mode Bluetooth 5.1 and 2.4GHz wireless connectivity, with adjustable DPI precision from 800 to 2400.',
    specifications:
      'DPI: 800 / 1200 / 1600 / 2400 DPI | Connectivity: Dual Bluetooth + 2.4G Nano USB | Battery: Type-C rechargeable (60 days standby)',
    rating: 4.8,
    isFeatured: false,
    createdAt: '2026-03-06',
  },
  {
    id: 'prod-007',
    name: 'Hardcover Linen Foil-Stamped Journal',
    category: 'Accessories',
    price: 650,
    quantity: 18,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description:
      'Bound in tactile woven natural linen with delicate gold foil floral embossing. Contains 192 numbered pages of fountain-pen friendly 120gsm ivory acid-free paper, an expandable inner pocket, and dual ribbon markers.',
    specifications:
      'Pages: 192 ruled & numbered | Paper weight: 120 gsm bleed-proof ivory | Binding: Smyth sewn lay-flat | Size: A5 (148 x 210 mm)',
    rating: 5.0,
    isFeatured: false,
    createdAt: '2026-03-07',
  },
  {
    id: 'prod-008',
    name: 'Country Club Striped Canvas Tote',
    category: 'Accessories',
    price: 1450,
    quantity: 0, // Out of stock demo (0)
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    description:
      'Heavyweight 16oz cotton canvas tote tailored with forest green and blush accent handles. Roomy enough for a laptop, water bottle, books, and daily essentials with an interior zip pocket for keys and cardholders.',
    specifications:
      'Material: 100% Organic 16oz washed canvas | Strap drop: 28 cm | Dimensions: 42 x 34 x 14 cm | Interior: Brass zippered safety pocket',
    rating: 4.8,
    isFeatured: false,
    createdAt: '2026-03-08',
  },
];
