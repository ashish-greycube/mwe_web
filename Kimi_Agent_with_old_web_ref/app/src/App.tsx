import { useEffect, useState } from 'react';
import Navigation from './sections/Navigation';
import HeroSlider from './sections/HeroSlider';
import CustomerSection from './sections/CustomerSection';
import ProductsSection from './sections/ProductsSection';
import ApplicationsSection from './sections/ApplicationsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ClientsSection from './sections/ClientsSection';
import Footer from './sections/Footer';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation scrollY={scrollY} />
      <main>
        <HeroSlider />
        <CustomerSection />
        <ProductsSection />
        <ApplicationsSection />
        <TestimonialsSection />
        <ClientsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
