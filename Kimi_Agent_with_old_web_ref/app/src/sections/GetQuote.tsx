import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function GetQuote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const formPanelRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(
          leftImageRef.current,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          formPanelRef.current,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

      // Form fields staggered entrance
      const fields = formPanelRef.current?.querySelectorAll('.form-field');
      if (fields) {
        fields.forEach((field, index) => {
          scrollTl.fromTo(
            field,
            { y: '4vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.12 + index * 0.04
          );
        });
      }

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      scrollTl
        .to(
          leftImageRef.current,
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          formPanelRef.current,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the data to your backend
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="quote"
      className="section-pinned flex items-center justify-center"
      style={{ backgroundColor: '#0B0F17' }}
    >
      {/* Left Image Panel */}
      <div
        ref={leftImageRef}
        className="absolute left-[6vw] top-[12vh] w-[46vw] h-[76vh] rounded-[22px] overflow-hidden"
        style={{ boxShadow: '0 18px 50px rgba(0,0,0,0.35)' }}
      >
        <img
          src="/quote_installation.jpg"
          alt="Heat pump installation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Panel */}
      <div
        ref={formPanelRef}
        className="absolute left-[54vw] top-[12vh] w-[40vw] h-[76vh] card-glass p-8 lg:p-10 flex flex-col justify-center"
      >
        <h2 className="font-display font-bold text-[clamp(24px,3vw,40px)] text-primary-light uppercase">
          Get a <span className="text-[#F36B24]">Quote</span>
        </h2>
        <div className="orange-rule mt-4 mb-4" />
        <p className="text-base text-secondary-light leading-relaxed mb-6">
          Tell us about your project. We'll outline capacity, configuration, and expected ROI—usually within 2 business days.
        </p>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F36B24]/20 flex items-center justify-center mb-4">
              <Send className="w-8 h-8 text-[#F36B24]" />
            </div>
            <h3 className="font-display font-bold text-xl text-primary-light mb-2">
              Quote Request Submitted!
            </h3>
            <p className="text-secondary-light">
              We'll get back to you within 2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-field">
              <label className="block text-xs font-mono-label text-secondary-light mb-1.5">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-primary-light text-sm focus:outline-none focus:border-[#F36B24]/50 focus:ring-1 focus:ring-[#F36B24]/50 transition-all"
                placeholder="Your full name"
              />
            </div>

            <div className="form-field">
              <label className="block text-xs font-mono-label text-secondary-light mb-1.5">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-primary-light text-sm focus:outline-none focus:border-[#F36B24]/50 focus:ring-1 focus:ring-[#F36B24]/50 transition-all"
                placeholder="Your company name"
              />
            </div>

            <div className="form-field grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-label text-secondary-light mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-primary-light text-sm focus:outline-none focus:border-[#F36B24]/50 focus:ring-1 focus:ring-[#F36B24]/50 transition-all"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-label text-secondary-light mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-primary-light text-sm focus:outline-none focus:border-[#F36B24]/50 focus:ring-1 focus:ring-[#F36B24]/50 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div className="form-field">
              <label className="block text-xs font-mono-label text-secondary-light mb-1.5">
                Project Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-primary-light text-sm focus:outline-none focus:border-[#F36B24]/50 focus:ring-1 focus:ring-[#F36B24]/50 transition-all resize-none"
                placeholder="Tell us about your project requirements..."
              />
            </div>

            <div className="form-field pt-2">
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                Request a quote
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="form-field flex items-center justify-center gap-2 text-sm text-secondary-light">
              <Mail className="w-4 h-4" />
              <span>Or email: sales@mechworld.example</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
