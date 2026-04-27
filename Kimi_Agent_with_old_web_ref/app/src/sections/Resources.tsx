import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Download, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Resources() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation
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

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.resource-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 40, opacity: 0 },
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

  const resources = [
    {
      title: '2026 Guide to Heat Pump Incentives',
      description: 'Grants, tax offsets, and compliance timelines by region.',
      icon: FileText,
      action: 'Download PDF',
    },
    {
      title: 'Technical Specifications',
      description: 'Capacity ranges, COP curves, dimensions, and installation clearances.',
      icon: Download,
      action: 'View Specs',
    },
    {
      title: 'Case Study: Hotel Retrofit',
      description: 'How a 200-room property cut water heating costs by 62%.',
      icon: FileText,
      action: 'Read Case Study',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28"
      style={{ backgroundColor: '#0B0F17' }}
    >
      <div className="w-full px-6 lg:px-[6vw]">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-12">
          <h2 className="font-display font-bold text-[clamp(28px,3.5vw,44px)] text-primary-light uppercase">
            <span className="text-[#F36B24]">Resources</span>
          </h2>
          <p className="mt-4 text-base lg:text-lg text-secondary-light max-w-xl mx-auto">
            Guides, specs, and case studies to help you plan.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[3vw]"
        >
          {resources.map((resource, index) => (
            <div
              key={index}
              className="resource-card card-solid p-6 lg:p-8 group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F36B24]/10 flex items-center justify-center mb-5 group-hover:bg-[#F36B24]/20 transition-colors">
                <resource.icon className="w-6 h-6 text-[#F36B24]" />
              </div>
              <h3 className="font-display font-bold text-lg text-primary-light mb-3">
                {resource.title}
              </h3>
              <p className="text-sm text-secondary-light leading-relaxed mb-5">
                {resource.description}
              </p>
              <button className="flex items-center gap-2 text-sm font-medium text-[#F36B24] group-hover:gap-3 transition-all">
                {resource.action}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
