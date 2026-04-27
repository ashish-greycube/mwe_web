import { ArrowRight } from 'lucide-react';

const customerTypes = [
  {
    title: 'COMMERCIAL',
    image: '/commercial_building.jpg',
    description: 'A heat pump water heater (HPWH) is an effective and efficient way to provide hot water for commercial buildings. The system uses a water heating heat pump to move heat from a cool reservoir such as air and transfer this heat into water.',
    link: '#products'
  },
  {
    title: 'RESIDENTIAL',
    image: '/residential_building.jpg',
    description: 'Heating is the basic requirement in any home and domestic heating accounts for over 35% of the overall CO2 emissions industrialized countries with moderate climates each year. Hence making domestic heating more efficient and sustainable is a very important step towards reducing carbon footprint.',
    link: '#products'
  }
];

export default function CustomerSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      {/* Orange Banner */}
      <div className="bg-[#F36B24] py-4 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl md:text-2xl font-semibold text-white text-center uppercase tracking-wider">
            We Amaze Our Customer
          </h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {customerTypes.map((type, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-lg overflow-hidden card-shadow hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-4">
                  {type.description}
                </p>
                <a
                  href={type.link}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(type.link)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-[#F36B24] font-medium hover:gap-4 transition-all duration-300"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
