import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ClipboardCheck, Settings, Wrench, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CustomEngineering() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);

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
          rightPanelRef.current,
          { x: '60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

      // Bullets staggered entrance
      const bullets = bulletsRef.current?.querySelectorAll('.bullet-item');
      if (bullets) {
        bullets.forEach((bullet, index) => {
          scrollTl.fromTo(
            bullet,
            { y: '6vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0.12 + index * 0.05
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
          rightPanelRef.current,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: 'Site survey & thermal load analysis',
      icon: ClipboardCheck,
    },
    {
      title: 'Hydraulic & controls integration',
      icon: Settings,
    },
    {
      title: 'Installation supervision & commissioning',
      icon: Wrench,
    },
    {
      title: 'Predictive maintenance & remote support',
      icon: Headphones,
    },
  ];

  return (
    <section
      ref={sectionRef}
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
          src="/custom_engineer.jpg"
          alt="Engineer working on equipment"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Text Panel */}
      <div
        ref={rightPanelRef}
        className="absolute left-[54vw] top-[12vh] w-[40vw] h-[76vh] card-glass p-8 lg:p-12 flex flex-col justify-center"
      >
        <h2 className="font-display font-bold text-[clamp(24px,3vw,40px)] text-primary-light uppercase">
          Custom <span className="text-[#F36B24]">Engineering</span>
        </h2>
        <div className="orange-rule mt-4 mb-6" />
        <p className="text-base lg:text-lg text-secondary-light leading-relaxed mb-8">
          No two sites are identical. We model load profiles, hydraulics, and controls—then build a system that fits your infrastructure and maintenance capabilities.
        </p>

        {/* Service Bullets */}
        <div ref={bulletsRef} className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="bullet-item flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F36B24]/10 flex items-center justify-center">
                <service.icon className="w-5 h-5 text-[#F36B24]" />
              </div>
              <span className="text-sm lg:text-base text-secondary-light">{service.title}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-8 btn-primary w-fit flex items-center gap-2"
        >
          Talk to an engineer
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
