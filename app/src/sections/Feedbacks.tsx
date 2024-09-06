"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import images
import imgJohnDoe from '@/public/logo.png';
import imgJaneSmith from '@/public/logo.png';
import imgDavidBrown from '@/public/logo.png';

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [showFullTestimonial, setShowFullTestimonial] = useState(false);

  return (
    <div 
      className="testimonial-card rounded-lg shadow-md p-6 bg-white transition-transform duration-300 ease-in-out hover:scale-105"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="testimonial-image flex justify-center mb-4">
        <Image src={testimonial.image} alt={testimonial.name} width={100} height={100} className="rounded-full" />
      </div>
      <div className="testimonial-content">
        <h3 className="testimonial-name text-xl font-bold mb-2">{testimonial.name}</h3>
        <p className="testimonial-role text-gray-500 mb-4">{testimonial.role}</p>
        <p className="testimonial-text text-gray-700 mb-4">
          {showFullTestimonial ? testimonial.fullText : testimonial.shortText}
        </p>
        {testimonial.fullText && (
          <button
            className="read-more-button px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => setShowFullTestimonial(!showFullTestimonial)}
          >
            {showFullTestimonial ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
};

interface Testimonial {
  name: string;
  role: string;
  shortText: string;
  fullText: string;
  image: any;
}

const Testimonials = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const testimonials: Testimonial[] = [
    {
      name: 'John Doe',
      role: 'Software Engineer',
      shortText: 'This product is amazing! It helped me to...',
      fullText: 'This product is absolutely amazing! It helped me to streamline my workflow and improve my productivity significantly...',
      image: imgJohnDoe,
    },
    {
      name: 'Jane Smith',
      role: 'Marketing Manager',
      shortText: 'I love how easy it is to use! I was able to...',
      fullText: 'I love how easy this product is to use! I was able to create stunning marketing materials in a matter of minutes...',
      image: imgJaneSmith,
    },
    {
      name: 'David Brown',
      role: 'Product Designer',
      shortText: 'This product is a game-changer!...',
      fullText: 'This product is a game-changer! It has helped me to collaborate with my team more effectively...',
      image: imgDavidBrown,
    },
    // Additional testimonials if needed
  ];

  return (
    <section className="testimonials bg-gray-100 py-16 overflow-hidden">
      <div className="container  mx-auto px-4">
        <h2 className="section-title text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          modules={[Pagination, Autoplay]}
          className="testimonial-slider "
          breakpoints={{
            320: { // Added for very small screens
              slidesPerView: 1,
            },
            480: { // Adjusted for larger mobile screens
              slidesPerView: 1.2,
            },
            768: { // Tablet size
              slidesPerView: 2,
            },
            1024: { // Desktop size
              slidesPerView: 3,
            },
            1440: { // Larger desktops
              slidesPerView: 4,
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.name}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
