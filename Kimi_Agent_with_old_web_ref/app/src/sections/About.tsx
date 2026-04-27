import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Award, Users, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { x: '6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.1,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: Users, value: '500+', label: 'Projects Completed' },
    { icon: Globe, value: '25+', label: 'Countries Served' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28"
      style={{ backgroundColor: '#0B0F17' }}
    >
      <div className="w-full px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Image */}
          <div
            ref={imageRef}
            className="w-full lg:w-[46vw] h-[50vh] lg:h-[60vh] rounded-[22px] overflow-hidden"
            style={{ boxShadow: '0 18px 50px rgba(0,0,0,0.35)' }}
          >
            <img
              src="/about_facility.jpg"
              alt="MechWorld facility"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className="w-full lg:w-[40vw] card-glass p-8 lg:p-10"
          >
            <h2 className="font-display font-bold text-[clamp(24px,3vw,36px)] text-primary-light uppercase">
              About <span className="text-[#F36B24]">MechWorld</span>
            </h2>
            <div className="orange-rule mt-4 mb-6" />
            <p className="text-base lg:text-lg text-secondary-light leading-relaxed mb-8">
              We design, build, and support industrial heat pump systems for commercial and institutional clients. Our focus is simple: reliable performance, measurable savings, and long-term service.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 rounded-lg bg-[#F36B24]/10 flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-5 h-5 text-[#F36B24]" />
                  </div>
                  <div className="font-display font-bold text-xl lg:text-2xl text-primary-light">
                    {stat.value}
                  </div>
                  <div className="text-xs text-secondary-light mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <button className="btn-secondary flex items-center gap-2">
              Meet the team
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
