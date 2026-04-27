import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Wind, RotateCw, Thermometer, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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
          leftPanelRef.current,
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          rightImageRef.current,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

      // Steps staggered entrance
      const steps = stepsRef.current?.querySelectorAll('.step-item');
      if (steps) {
        steps.forEach((step, index) => {
          scrollTl.fromTo(
            step,
            { x: '-6vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0.12 + index * 0.04
          );
        });
      }

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      scrollTl
        .to(
          leftPanelRef.current,
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          rightImageRef.current,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '1',
      title: 'Ambient air',
      description: 'Heat is drawn from the surrounding air.',
      icon: Wind,
    },
    {
      number: '2',
      title: 'Refrigerant cycle',
      description: 'Compressor boosts temperature.',
      icon: RotateCw,
    },
    {
      number: '3',
      title: 'Heat exchanger',
      description: 'Thermal energy transfers to water.',
      icon: Thermometer,
    },
    {
      number: '4',
      title: 'Hot water delivery',
      description: 'Stored at 60–65°C+, ready on demand.',
      icon: Droplets,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-pinned flex items-center justify-center"
      style={{ backgroundColor: '#0B0F17' }}
    >
      {/* Left Text Panel */}
      <div
        ref={leftPanelRef}
        className="absolute left-[6vw] top-[12vh] w-[40vw] h-[76vh] card-glass p-8 lg:p-12 flex flex-col justify-center"
      >
        <h2 className="font-display font-bold text-[clamp(24px,3vw,40px)] text-primary-light uppercase">
          How It <span className="text-[#F36B24]">Works</span>
        </h2>
        <div className="orange-rule mt-4 mb-6" />
        <p className="text-base lg:text-lg text-secondary-light leading-relaxed mb-8">
          A closed refrigeration cycle moves heat from air to water—efficiently, consistently, and without on-site combustion.
        </p>

        {/* Steps */}
        <div ref={stepsRef} className="space-y-5">
          {steps.map((step) => (
            <div key={step.number} className="step-item flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F36B24]/10 flex items-center justify-center">
                <step.icon className="w-5 h-5 text-[#F36B24]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-label text-[#F36B24]">{step.number}</span>
                  <span className="font-display font-semibold text-primary-light">
                    {step.title}
                  </span>
                </div>
                <p className="text-sm text-secondary-light mt-1">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-8 btn-secondary w-fit flex items-center gap-2">
          View system diagram
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right Image Panel */}
      <div
        ref={rightImageRef}
        className="absolute left-[48vw] top-[12vh] w-[46vw] h-[76vh] rounded-[22px] overflow-hidden"
        style={{ boxShadow: '0 18px 50px rgba(0,0,0,0.35)' }}
      >
        <img
          src="/howitworks_unit.jpg"
          alt="Heat pump unit"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
