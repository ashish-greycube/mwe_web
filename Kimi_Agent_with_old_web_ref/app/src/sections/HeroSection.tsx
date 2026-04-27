import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Download, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const featureCardRef = useRef<HTMLDivElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        section.querySelector('.hero-bg'),
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      )
        .fromTo(
          headlineRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          0.2
        )
        .fromTo(
          subheadlineRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.4
        )
        .fromTo(
          bodyRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.5
        )
        .fromTo(
          featureCardRef.current,
          { x: '10vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, duration: 0.8 },
          0.3
        )
        .fromTo(
          ctaRowRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          0.7
        )
        .fromTo(
          microLabelRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          0.6
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, bodyRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
            gsap.set(featureCardRef.current, { opacity: 1, x: 0 });
            gsap.set(ctaRowRef.current, { opacity: 1, y: 0 });
            gsap.set(microLabelRef.current, { opacity: 1, y: 0 });
            gsap.set(section.querySelector('.hero-bg'), { opacity: 1, scale: 1 });
          },
        },
      });

      // ENTRANCE (0-30%): Hold - elements already visible from load animation
      // SETTLE (30-70%): Static
      // EXIT (70-100%): Elements exit
      scrollTl
        .fromTo(
          headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          subheadlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(
          bodyRef.current,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.74
        )
        .fromTo(
          featureCardRef.current,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          ctaRowRef.current,
          { y: 0, opacity: 1 },
          { y: '10vh', opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(
          microLabelRef.current,
          { y: 0, opacity: 1 },
          { y: '8vh', opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(
          section.querySelector('.hero-bg'),
          { scale: 1, opacity: 1 },
          { scale: 1.06, opacity: 0.6, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const features = [
    'High-temperature output up to 65–75°C',
    'COP-optimized for industrial duty cycles',
    'Corrosion-resistant construction & IoT monitoring',
  ];

  return (
    <section
      ref={sectionRef}
      className="section-pinned flex items-center justify-center"
      style={{ backgroundColor: '#0B0F17' }}
    >
      {/* Background Image */}
      <div
        className="hero-bg absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/hero_equipment.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17]/95 via-[#0B0F17]/70 to-[#0B0F17]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center">
        {/* Left Headline Block */}
        <div className="absolute left-[6vw] top-[18vh] w-[42vw] max-w-[600px]">
          <h1
            ref={headlineRef}
            className="font-display font-extrabold text-[clamp(32px,4.5vw,64px)] text-primary-light uppercase leading-[0.95]"
          >
            Industrial{' '}
            <span className="text-[#F36B24]">Heat Pumps</span>
          </h1>
          <p
            ref={subheadlineRef}
            className="mt-4 font-display font-semibold text-[clamp(16px,1.8vw,24px)] text-primary-light"
          >
            Engineered for 24/7 performance. Up to 65°C+ output.
          </p>
          <p
            ref={bodyRef}
            className="mt-4 text-base lg:text-lg text-secondary-light leading-relaxed max-w-[480px]"
          >
            Replace fossil fuel boilers with electric heat pumps—reduce energy costs by up to 70% with proven, site-built reliability.
          </p>
        </div>

        {/* Right Feature Card */}
        <div
          ref={featureCardRef}
          className="absolute right-[6vw] top-[22vh] w-[34vw] max-w-[420px] card-glass p-6 lg:p-8"
        >
          <h3 className="font-display font-bold text-lg lg:text-xl text-primary-light uppercase mb-4">
            Built for Real Sites
          </h3>
          <div className="orange-rule mb-4" />
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#F36B24] flex-shrink-0 mt-0.5" />
                <span className="text-sm lg:text-base text-secondary-light">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Left Micro Label */}
        <div
          ref={microLabelRef}
          className="absolute left-[6vw] bottom-[8vh]"
        >
          <span className="font-mono-label text-secondary-light">
            MechWorld Eco Heat Pumps — Commercial & Industrial
          </span>
        </div>

        {/* Bottom Right CTA Row */}
        <div
          ref={ctaRowRef}
          className="absolute right-[6vw] bottom-[8vh] flex items-center gap-4"
        >
          <button
            onClick={() => document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary flex items-center gap-2"
          >
            Request a quote
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 text-sm text-secondary-light hover:text-primary-light transition-colors">
            <Download className="w-4 h-4" />
            Download technical specs
          </button>
        </div>
      </div>
    </section>
  );
}
