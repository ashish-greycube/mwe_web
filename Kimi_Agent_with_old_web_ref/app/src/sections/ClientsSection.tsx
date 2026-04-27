import { Building2, Utensils, Hotel, HeartPulse, Building } from 'lucide-react';

const clients = [
  {
    name: 'Manipal University',
    icon: Building2
  },
  {
    name: 'McDonald\'s',
    icon: Utensils
  },
  {
    name: 'Godrej',
    icon: Building
  },
  {
    name: 'Sir Ganga Ram Hospital',
    icon: HeartPulse
  },
  {
    name: 'The Park Hotels',
    icon: Hotel
  }
];

export default function ClientsSection() {
  return (
    <section id="clients" className="py-16 md:py-24 bg-[#2a2a2a] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-white uppercase tracking-wide mb-12">
          Our Best Clients
        </h2>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/20 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F36B24]/20 group-hover:scale-110 transition-all duration-500">
                <client.icon className="w-8 h-8 text-white/80 group-hover:text-[#F36B24] transition-colors" />
              </div>
              <span className="text-white/90 text-sm font-medium text-center group-hover:text-white transition-colors">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
