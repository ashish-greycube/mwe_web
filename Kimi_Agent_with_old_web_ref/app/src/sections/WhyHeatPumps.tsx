import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhyHeatPumps() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

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
        )
        .fromTo(
          statRef.current,
          { y: '10vh', scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0.1
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
        )
        .to(
          statRef.current,
          { opacity: 0, ease: 'power2.in' },
          0.8
        );
    }, section);

    return () => ctx.revert();
  }, []);

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
          src="/why_installation_wide.jpg"
          alt="Heat pump installation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Text Panel */}
      <div
        ref={rightPanelRef}
        className="absolute left-[54vw] top-[12vh] w-[40vw] h-[76vh] card-glass p-8 lg:p-12 flex flex-col justify-center"
      >
        <h2 className="font-display font-bold text-[clamp(24px,3vw,40px)] text-primary-light uppercase">
          Why Heat Pumps <span className="text-[#F36B24]">Now</span>
        </h2>
        <div className="orange-rule mt-4 mb-6" />
        <p className="text-base lg:text-lg text-secondary-light leading-relaxed mb-8">
          Regulations are tightening. Energy volatility is costly. Heat pumps deliver consistent output with a fraction of the operating cost—backed by measurable ROI.
        </p>

        {/* Big Stat */}
        <div ref={statRef} className="mt-4">
          <div className="font-display font-extrabold text-[clamp(48px,6vw,80px)] text-[#F36B24] leading-none">
            UP TO 70%
          </div>
          <p className="mt-3 text-sm text-secondary-light">
            Reduction in annual heating energy costs vs. fossil fuel boilers (typical industrial duty cycle).
          </p>
        </div>

        <button
          onClick={() => document.querySelector('#savings')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-8 btn-secondary w-fit flex items-center gap-2"
        >
          See operating cost comparison
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
