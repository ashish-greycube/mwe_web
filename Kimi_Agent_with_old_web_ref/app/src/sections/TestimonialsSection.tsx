import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    company: 'Fortis Hospital',
    location: 'Mumbai',
    content: 'MechWorld Eco heat pumps have significantly reduced our energy costs while providing reliable hot water for our hospital. The installation was seamless and the support team has been exceptional. We highly recommend their products.',
    author: 'Dr. Rajesh Kumar',
    designation: 'Facility Manager'
  },
  {
    id: 2,
    company: 'College of Engineering Pune',
    location: 'Pune',
    content: 'We installed MechWorld Eco heat pumps in our hostel facilities and have seen remarkable energy savings. The system is efficient, reliable, and requires minimal maintenance. A great investment for any institution.',
    author: 'Prof. S. M. Deshpande',
    designation: 'Principal'
  },
  {
    id: 3,
    company: 'Hotel Silver Oak',
    location: 'Nashik',
    content: 'Our hotel requires consistent hot water supply for our guests. MechWorld Eco heat pumps deliver exactly that with impressive energy efficiency. Our guests are happy, and so are we with the reduced utility bills.',
    author: 'Mr. Amit Sharma',
    designation: 'General Manager'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="section-title mb-12">Testimonials</h2>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-4 left-0 md:-left-8">
            <Quote className="w-12 h-12 md:w-16 md:h-16 text-[#F36B24]/20" />
          </div>

          {/* Testimonial Content */}
          <div className="bg-white rounded-2xl p-8 md:p-12 card-shadow">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-500 ${
                  index === currentIndex
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 absolute inset-0 translate-x-8'
                }`}
              >
                {index === currentIndex && (
                  <>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-[#F36B24]/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-[#F36B24]">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {testimonial.author}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {testimonial.designation}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white card-shadow hover:bg-[#F36B24] hover:text-white transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#F36B24] w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white card-shadow hover:bg-[#F36B24] hover:text-white transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
