import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [showFullTestimonial, setShowFullTestimonial] = useState(false);

  return (
    <div className="testimonial-card rounded-lg shadow-md p-6">
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
          <button className="read-more-button px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={() => setShowFullTestimonial(!showFullTestimonial)}>
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
  image: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'John Doe',
      role: 'Software Engineer',
      shortText: 'This product is amazing! It helped me to...',
      fullText: 'This product is absolutely amazing! It helped me to streamline my workflow and improve my productivity significantly. I was initially skeptical, but after trying it out, I was blown away. The ease of use and powerful features are truly impressive. I highly recommend this product to anyone looking for a solution to...',
      image: '/images/testimonial-1.jpg',
    },
    {
      name: 'Jane Smith',
      role: 'Marketing Manager',
      shortText: 'I love how easy it is to use! I was able to...',
      fullText: 'I love how easy this product is to use! I was able to create stunning marketing materials in a matter of minutes. The templates are well-designed and the customization options are endless. This product has made my job so much easier and more enjoyable. I highly recommend it to anyone in the marketing field.',
      image: '/images/testimonial-2.jpg',
    },
    {
      name: 'David Brown',
      role: 'Product Designer',
      shortText: 'This product is a game-changer! It has helped me to...',
      fullText: 'This product is a game-changer! It has helped me to collaborate with my team more effectively and create beautiful designs with ease. The intuitive interface and powerful tools make it a joy to use. I can\'t imagine working without it anymore.',
      image: '/images/testimonial-3.jpg',
    },
  ];

  return (
    <section className="testimonials bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;