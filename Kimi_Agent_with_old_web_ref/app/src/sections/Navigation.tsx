import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavigationProps {
  scrollY: number;
}

export default function Navigation({ scrollY }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { 
      name: 'Products', 
      href: '#products',
      dropdown: [
        'Jal Domestic Heat Pump',
        'DEW Commercial Heat Pump',
        'Dew Drop to Heat Pump',
        'Dew Superheater'
      ]
    },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Technology', href: '#technology' },
    { name: 'Awards & Achievements', href: '#awards' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 100 
          ? 'bg-white shadow-lg' 
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2" onClick={() => scrollToSection('#home')}>
            <div className="text-xl md:text-2xl font-bold">
              <span className="text-gray-800">MECHWORLD</span>
              <span className="text-[#F36B24]">ECO</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.dropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <button 
                      onClick={() => scrollToSection(link.href)}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#F36B24] transition-colors"
                    >
                      {link.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {isProductsOpen && (
                      <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg py-2 border border-gray-100">
                        {link.dropdown.map((item) => (
                          <a
                            key={item}
                            href="#products"
                            onClick={() => {
                              scrollToSection('#products');
                              setIsProductsOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F36B24]/10 hover:text-[#F36B24] transition-colors"
                          >
                            {item}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      link.name === 'Home' 
                        ? 'bg-[#F36B24] text-white hover:bg-[#E55A15]' 
                        : 'text-gray-700 hover:text-[#F36B24]'
                    }`}
                  >
                    {link.name}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#F36B24]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-[#F36B24]/10 hover:text-[#F36B24] rounded transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
