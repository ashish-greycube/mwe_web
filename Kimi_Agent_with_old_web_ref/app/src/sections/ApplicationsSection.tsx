import { useState } from 'react';

const applications = [
  {
    name: 'Hotels & Resorts',
    image: '/app_hotel.jpg',
    description: 'Reliable hot water supply for hospitality industry'
  },
  {
    name: 'Hospitals',
    image: '/app_hospital.jpg',
    description: 'Sanitary hot water for healthcare facilities'
  },
  {
    name: 'Dairy Industry',
    image: '/app_dairy.jpg',
    description: 'Process heating for dairy operations'
  },
  {
    name: 'Hostels',
    image: '/app_hostel.jpg',
    description: 'Cost-effective water heating for accommodations'
  },
  {
    name: 'Swimming Pool',
    image: '/app_pool.jpg',
    description: 'Pool water heating and temperature control'
  },
  {
    name: 'Pharma',
    image: '/app_pharma.jpg',
    description: 'Precision heating for pharmaceutical processes'
  },
  {
    name: 'Housing Complex',
    image: '/app_housing.jpg',
    description: 'Centralized hot water for residential communities'
  },
  {
    name: 'Textile',
    image: '/app_textile.jpg',
    description: 'Process heating for textile manufacturing'
  },
  {
    name: 'Automobile',
    image: '/app_automobile.jpg',
    description: 'Industrial heating for automotive sector'
  }
];

export default function ApplicationsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="applications" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="section-title mb-12">Applications</h2>

        {/* Applications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, index) => (
            <div
              key={index}
              className="group relative rounded-lg overflow-hidden card-shadow cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={app.image}
                  alt={app.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredIndex === index ? 'scale-110' : 'scale-100'
                  }`}
                />
                {/* Overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${
                    hoveredIndex === index ? 'opacity-90' : 'opacity-70'
                  }`}
                />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {app.name}
                </h3>
                <p 
                  className={`text-sm text-white/90 transition-all duration-500 ${
                    hoveredIndex === index 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  {app.description}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div 
                className={`absolute bottom-0 left-0 h-1 bg-[#F36B24] transition-all duration-500 ${
                  hoveredIndex === index ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
