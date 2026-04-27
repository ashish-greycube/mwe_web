import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeatureCollage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

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
          topLeftRef.current,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          topRightRef.current,
          { x: '55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          bottomLeftRef.current,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          bottomRightRef.current,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        );

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      scrollTl
        .to(
          topLeftRef.current,
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          topRightRef.current,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          bottomLeftRef.current,
          { y: '14vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          bottomRightRef.current,
          { y: '14vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="section-pinned flex items-center justify-center"
      style={{ backgroundColor: '#0B0F17' }}
    >
      {/* Top Left - Image Card */}
      <div
        ref={topLeftRef}
        className="absolute left-[6vw] top-[10vh] w-[44vw] h-[38vh] rounded-[22px] overflow-hidden"
        style={{ boxShadow: '0 18px 50px rgba(0,0,0,0.35)' }}
      >
        <img
          src="/feature_unit_closeup.jpg"
          alt="Heat pump unit close-up"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Top Right - Text Card */}
      <div
        ref={topRightRef}
        className="absolute left-[52vw] top-[10vh] w-[42vw] h-[38vh] card-solid p-8 lg:p-10 flex flex-col justify-center"
      >
        <h2 className="font-display font-bold text-[clamp(20px,2.5vw,32px)] text-primary-light uppercase">
          Built for Demanding Environments
        </h2>
        <div className="orange-rule mt-4 mb-4" />
        <p className="text-base text-secondary-light leading-relaxed">
          From coastal humidity to dust-heavy plants—our systems are spec'd for real-world conditions, not lab tests.
        </p>
      </div>

      {/* Bottom Left - Text Card */}
      <div
        ref={bottomLeftRef}
        className="absolute left-[6vw] top-[54vh] w-[44vw] h-[36vh] card-solid p-8 lg:p-10 flex flex-col justify-center"
      >
        <h2 className="font-display font-bold text-[clamp(20px,2.5vw,32px)] text-primary-light uppercase">
          Modular. Scalable. Serviceable.
        </h2>
        <div className="orange-rule mt-4 mb-4" />
        <p className="text-base text-secondary-light leading-relaxed">
          Add capacity in stages. Swap components without draining the loop. 25-year spare parts availability.
        </p>
      </div>

      {/* Bottom Right - Image Card */}
      <div
        ref={bottomRightRef}
        className="absolute left-[52vw] top-[54vh] w-[42vw] h-[36vh] rounded-[22px] overflow-hidden"
        style={{ boxShadow: '0 18px 50px rgba(0,0,0,0.35)' }}
      >
        <img
          src="/feature_piping_detail.jpg"
          alt="Industrial piping detail"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
