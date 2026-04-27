import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Applications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

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
          labelRef.current,
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          leftCardRef.current,
          { y: '70vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(
          centerCardRef.current,
          { y: '70vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(
          rightCardRef.current,
          { y: '70vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      scrollTl
        .to(
          labelRef.current,
          { opacity: 0, ease: 'power2.in' },
          0.8
        )
        .to(
          leftCardRef.current,
          { y: '-16vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          centerCardRef.current,
          { y: '-16vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .to(
          rightCardRef.current,
          { y: '-16vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const applications = [
    {
      title: 'Hotels & Resorts',
      description:
        'Domestic hot water at scale—quiet operation, stable temperatures, and compliance with hospitality standards.',
      image: '/app_hotel.jpg',
    },
    {
      title: 'Manufacturing',
      description:
        'Process heating and washdowns with high uptime and predictive maintenance support.',
      image: '/app_factory.jpg',
    },
    {
      title: 'District & Large Commercial',
      description:
        'Centralized hot water for hospitals, universities, and mixed-use developments with remote monitoring.',
      image: '/app_campus.jpg',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="applications"
      className="section-pinned flex items-center justify-center"
      style={{ backgroundColor: '#0B0F17' }}
    >
      {/* Micro Label */}
      <div
        ref={labelRef}
        className="absolute top-[6vh] left-1/2 -translate-x-1/2"
      >
        <span className="font-mono-label text-secondary-light">Applications</span>
      </div>

      {/* Left Card */}
      <div
        ref={leftCardRef}
        className="absolute left-[6vw] top-[12vh] w-[26vw] h-[76vh] card-solid overflow-hidden"
      >
        <div className="h-[55%] overflow-hidden">
          <img
            src={applications[0].image}
            alt={applications[0].title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-[45%] p-6 flex flex-col justify-center">
          <div className="w-2 h-2 rounded-full bg-[#F36B24] mb-3" />
          <h3 className="font-display font-bold text-lg lg:text-xl text-primary-light uppercase mb-3">
            {applications[0].title}
          </h3>
          <p className="text-sm text-secondary-light leading-relaxed">
            {applications[0].description}
          </p>
        </div>
      </div>

      {/* Center Card */}
      <div
        ref={centerCardRef}
        className="absolute left-[37vw] top-[12vh] w-[26vw] h-[76vh] card-solid overflow-hidden"
      >
        <div className="h-[55%] overflow-hidden">
          <img
            src={applications[1].image}
            alt={applications[1].title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-[45%] p-6 flex flex-col justify-center">
          <div className="w-2 h-2 rounded-full bg-[#F36B24] mb-3" />
          <h3 className="font-display font-bold text-lg lg:text-xl text-primary-light uppercase mb-3">
            {applications[1].title}
          </h3>
          <p className="text-sm text-secondary-light leading-relaxed">
            {applications[1].description}
          </p>
        </div>
      </div>

      {/* Right Card */}
      <div
        ref={rightCardRef}
        className="absolute left-[68vw] top-[12vh] w-[26vw] h-[76vh] card-solid overflow-hidden"
      >
        <div className="h-[55%] overflow-hidden">
          <img
            src={applications[2].image}
            alt={applications[2].title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-[45%] p-6 flex flex-col justify-center">
          <div className="w-2 h-2 rounded-full bg-[#F36B24] mb-3" />
          <h3 className="font-display font-bold text-lg lg:text-xl text-primary-light uppercase mb-3">
            {applications[2].title}
          </h3>
          <p className="text-sm text-secondary-light leading-relaxed">
            {applications[2].description}
          </p>
        </div>
      </div>
    </section>
  );
}
