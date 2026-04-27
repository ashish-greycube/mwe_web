import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function EnergySavings() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
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
        )
        .fromTo(
          statRef.current,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0.1
        );

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
      id="savings"
      className="section-pinned flex items-center justify-center"
      style={{ backgroundColor: '#0B0F17' }}
    >
      {/* Left Text Panel */}
      <div
        ref={leftPanelRef}
        className="absolute left-[6vw] top-[12vh] w-[40vw] h-[76vh] card-glass p-8 lg:p-12 flex flex-col justify-center"
      >
        <h2 className="font-display font-bold text-[clamp(24px,3vw,40px)] text-primary-light uppercase">
          Energy Savings <span className="text-[#F36B24]">& ROI</span>
        </h2>
        <div className="orange-rule mt-4 mb-6" />
        <p className="text-base lg:text-lg text-secondary-light leading-relaxed mb-8">
          Cut operating costs and carbon exposure. Our projects typically show payback in 2–4 years—then years of lower-cost, low-carbon heat.
        </p>

        {/* Big Stat */}
        <div ref={statRef} className="mt-4">
          <div className="font-display font-extrabold text-[clamp(40px,5vw,64px)] text-[#F36B24] leading-none">
            2–4 YEAR
          </div>
          <p className="mt-3 text-sm text-secondary-light">
            Typical payback period vs. fossil fuel heating (project-dependent).
          </p>
        </div>

        <button
          onClick={() => document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-8 btn-primary w-fit flex items-center gap-2"
        >
          Request a savings estimate
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
          src="/roi_control_panel.jpg"
          alt="Heat pump control panel"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
