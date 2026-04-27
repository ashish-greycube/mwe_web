import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Wifi, Calendar, Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Reliability() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

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

  const features = [
    {
      title: 'Corrosion-resistant frames & coatings',
      icon: Shield,
    },
    {
      title: 'IoT monitoring & alerts',
      icon: Wifi,
    },
    {
      title: 'Preventive maintenance programs',
      icon: Calendar,
    },
    {
      title: '25-year spare parts availability',
      icon: Package,
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
          src="/reliability_inspection.jpg"
          alt="Technician inspecting equipment"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Text Panel */}
      <div
        ref={rightPanelRef}
        className="absolute left-[54vw] top-[12vh] w-[40vw] h-[76vh] card-glass p-8 lg:p-12 flex flex-col justify-center"
      >
        <h2 className="font-display font-bold text-[clamp(24px,3vw,40px)] text-primary-light uppercase">
          Reliability <span className="text-[#F36B24]">& Support</span>
        </h2>
        <div className="orange-rule mt-4 mb-6" />
        <p className="text-base lg:text-lg text-secondary-light leading-relaxed mb-8">
          Industrial duty means continuous operation. We design for uptime, stock critical spares, and monitor performance remotely to catch issues before they become downtime.
        </p>

        {/* Features */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#F36B24]/10 flex items-center justify-center">
                <feature.icon className="w-5 h-5 text-[#F36B24]" />
              </div>
              <span className="text-sm lg:text-base text-secondary-light">{feature.title}</span>
            </div>
          ))}
        </div>

        <button className="mt-8 btn-secondary w-fit flex items-center gap-2">
          See support plans
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
