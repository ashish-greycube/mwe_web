import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

const quickLinks = [
  { name: 'Jal Domestic Heat Pump', href: '#products' },
  { name: 'Dew Commercial Heat Pump', href: '#products' },
  { name: 'Dew Drop to Heat Pump', href: '#products' },
  { name: 'Dew Superheater', href: '#products' }
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#F36B24] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold mb-6 uppercase tracking-wide border-b-2 border-white/30 pb-2 inline-block">
              About Us
            </h3>
            <p className="text-white/90 leading-relaxed text-sm">
              MWE is a Sister Concern company of Mech Well Industries Ltd. which is a renowned name in the industry for its power plant services for the past 25 years. MWE in technical collaboration with IIT Mumbai has worked hard to build one of the best reliability records in the industry.
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 uppercase tracking-wide border-b-2 border-white/30 pb-2 inline-block">
              Important Link
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm group"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-xl font-semibold mb-6 uppercase tracking-wide border-b-2 border-white/30 pb-2 inline-block">
              Address
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-white/90">
                  <p className="font-medium">MALAY</p>
                  <p>607/207, Anand C.H.S, Motwani Road,</p>
                  <p>Datta Mandir, Nashik Road,</p>
                  <p>Nashik 422101, Maharashtra, India</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div className="text-sm text-white/90">
                  <p>Call Us:</p>
                  <a href="tel:+912532453556" className="hover:underline">
                    +91 253 2453556
                  </a>
                  <span className="mx-2">|</span>
                  <a href="tel:+919130093942" className="hover:underline">
                    +91 9130093942
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a 
                  href="mailto:sales@mechworldeco.com" 
                  className="text-sm text-white/90 hover:underline"
                >
                  sales@mechworldeco.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/80">
            <p>&copy; {new Date().getFullYear()} MechWorld Eco Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
