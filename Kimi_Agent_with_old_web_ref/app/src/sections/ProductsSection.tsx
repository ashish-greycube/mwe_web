import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const categories = [
  'All',
  'Jal Domestic Heat Pump',
  'DEW Commercial Heat Pump',
  'Swimming Pool Heat Pump',
  'Waste Heat Recovery System'
];

const products = [
  {
    id: 1,
    name: 'Jal Domestic 3kW',
    category: 'Jal Domestic Heat Pump',
    image: '/product_domestic.jpg',
    capacity: '3 kW',
    description: 'Compact domestic heat pump for residential water heating'
  },
  {
    id: 2,
    name: 'DEW Commercial 10kW',
    category: 'DEW Commercial Heat Pump',
    image: '/product_commercial.jpg',
    capacity: '10 kW',
    description: 'High-capacity commercial heat pump system'
  },
  {
    id: 3,
    name: 'AquaTherm Pool 5kW',
    category: 'Swimming Pool Heat Pump',
    image: '/product_pool.jpg',
    capacity: '5 kW',
    description: 'Efficient pool water heating solution'
  },
  {
    id: 4,
    name: 'Heat Recovery Pro',
    category: 'Waste Heat Recovery System',
    image: '/product_wasteheat.jpg',
    capacity: '15 kW',
    description: 'Industrial waste heat recovery system'
  },
  {
    id: 5,
    name: 'Jal Domestic 5kW',
    category: 'Jal Domestic Heat Pump',
    image: '/product_domestic.jpg',
    capacity: '5 kW',
    description: 'Medium capacity domestic heat pump'
  },
  {
    id: 6,
    name: 'DEW Commercial 20kW',
    category: 'DEW Commercial Heat Pump',
    image: '/product_commercial.jpg',
    capacity: '20 kW',
    description: 'Large scale commercial heating solution'
  },
  {
    id: 7,
    name: 'AquaTherm Pool 8kW',
    category: 'Swimming Pool Heat Pump',
    image: '/product_pool.jpg',
    capacity: '8 kW',
    description: 'Commercial pool heating system'
  },
  {
    id: 8,
    name: 'Heat Recovery Ultra',
    category: 'Waste Heat Recovery System',
    image: '/product_wasteheat.jpg',
    capacity: '30 kW',
    description: 'High-capacity industrial heat recovery'
  }
];

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="section-title mb-8">Our Product</h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 md:px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#F36B24] text-white'
                  : 'bg-white text-gray-700 hover:bg-[#F36B24]/10 hover:text-[#F36B24]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-lg overflow-hidden card-shadow hover:shadow-xl transition-all duration-500 fade-in"
            >
              {/* Product Image */}
              <div className="relative h-48 md:h-56 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 md:p-6">
                <span className="text-xs font-medium text-[#F36B24] uppercase tracking-wide">
                  {product.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 mt-1 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Capacity: {product.capacity}
                  </span>
                  <button className="text-[#F36B24] hover:text-[#E55A15] transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
