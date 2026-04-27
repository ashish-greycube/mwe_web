import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, Mail, Send, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.contact-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 lg:py-28"
      style={{ backgroundColor: '#0B0F17' }}
    >
      <div className="w-full px-6 lg:px-[6vw]">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-12">
          <h2 className="font-display font-bold text-[clamp(28px,3.5vw,44px)] text-primary-light uppercase">
            <span className="text-[#F36B24]">Contact</span>
          </h2>
          <p className="mt-4 text-base lg:text-lg text-secondary-light max-w-xl mx-auto">
            Get in touch with our team for inquiries, support, or project discussions.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Form Card */}
          <div className="contact-card card-solid p-6 lg:p-8">
            <div className="w-12 h-12 rounded-xl bg-[#F36B24]/10 flex items-center justify-center mb-5">
              <Mail className="w-6 h-6 text-[#F36B24]" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary-light mb-4">
              Send a Project Brief
            </h3>

            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-[#F36B24]/20 flex items-center justify-center mx-auto mb-3">
                  <Send className="w-6 h-6 text-[#F36B24]" />
                </div>
                <p className="text-primary-light">Message sent!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-primary-light text-sm focus:outline-none focus:border-[#F36B24]/50 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-primary-light text-sm focus:outline-none focus:border-[#F36B24]/50 transition-all"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Your message"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-primary-light text-sm focus:outline-none focus:border-[#F36B24]/50 transition-all resize-none"
                />
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </form>
            )}
          </div>

          {/* Phone Card */}
          <div className="contact-card card-solid p-6 lg:p-8">
            <div className="w-12 h-12 rounded-xl bg-[#F36B24]/10 flex items-center justify-center mb-5">
              <Phone className="w-6 h-6 text-[#F36B24]" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary-light mb-4">
              Call Us
            </h3>
            <a
              href="tel:+15550142082"
              className="font-display font-semibold text-xl lg:text-2xl text-primary-light hover:text-[#F36B24] transition-colors"
            >
              +1 (555) 014-2082
            </a>
            <div className="flex items-center gap-2 mt-4 text-sm text-secondary-light">
              <Clock className="w-4 h-4" />
              <span>Mon–Fri, 08:00–18:00</span>
            </div>
          </div>

          {/* Visit Card */}
          <div className="contact-card card-solid p-6 lg:p-8">
            <div className="w-12 h-12 rounded-xl bg-[#F36B24]/10 flex items-center justify-center mb-5">
              <MapPin className="w-6 h-6 text-[#F36B24]" />
            </div>
            <h3 className="font-display font-bold text-lg text-primary-light mb-4">
              Visit Us
            </h3>
            <p className="text-secondary-light">
              1280 Industrial Parkway<br />
              Building 4, Suite 200<br />
              Houston, TX 77032
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#F36B24] hover:underline"
            >
              View on map
              <MapPin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
