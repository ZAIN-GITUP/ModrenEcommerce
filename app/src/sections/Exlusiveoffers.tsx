"use client"
import React, { useEffect } from 'react';
import img from '@/public/product1.png';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ExclusiveOffer: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true });
  }, []);

  return (
    <section
      className="bg-green-100 p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex flex-col lg:flex-row justify-between items-center"
      data-aos="fade-up"
    >
      <div
        className="text-center lg:text-left mb-4 lg:mb-0 lg:order-1 flex-1"
        data-aos="fade-right"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          Exclusive Offer
        </h2>
        <p className="mt-2 sm:mt-4 text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg">
          Unlock the ultimate style upgrade with our exclusive offer! Enjoy
          savings of up to 40% off on our latest New Arrivals.
        </p>
        <div className="mt-4 sm:mt-6 lg:mt-8 flex flex-wrap justify-center lg:justify-start space-x-4">
          {/* Countdown timer - Replace with actual logic */}
          <div className="text-center mx-2" data-aos="fade-right" data-aos-delay="300">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">06</p>
            <p className="text-xs sm:text-sm">Days</p>
          </div>
          <div className="text-center mx-2" data-aos="fade-right" data-aos-delay="600">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">18</p>
            <p className="text-xs sm:text-sm">Hours</p>
          </div>
          <div className="text-center mx-2" data-aos="fade-right" data-aos-delay="900">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">48</p>
            <p className="text-xs sm:text-sm">Min</p>
          </div>
        </div>
        <button
          className="mt-4 sm:mt-6 lg:mt-8 px-4 py-2 sm:px-6 sm:py-3 bg-green-600 text-white rounded-md text-xs sm:text-sm md:text-base lg:text-lg"
          data-aos="fade-right"
          data-aos-delay="1200"
        >
          Buy Now
        </button>
      </div>
      <div className="hidden  lg:block" data-aos="fade-left">
        <Image
          src={img}
          alt="Exclusive Offer"
          className="mx-auto object-cover mix-blend-multiply rounded-lg w-1/2"
          layout="intrinsic"
        />
      </div>
      <div className="lg:hidden" data-aos="fade-left">
        <Image
          src={img}
          alt="Exclusive Offer"
          className="w-full"
          layout="intrinsic"
        />
      </div>
    </section>
  );
};

export default ExclusiveOffer;
