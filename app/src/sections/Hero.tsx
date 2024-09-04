import React from 'react';
import banner from '@/public/landing pic.png'
import Image from 'next/image';
const Hero = () => {
  return (
    <section className="flex flex-col  md:flex-row items-center justify-between px-8 py-12 bg-green-100">
      <div className="text-center md:text-left  md:w-1/2">
        <h1 className="text-4xl mt-6 md:text-5xl font-bold text-green-900 mb-4">
          Discover and Find Your Own Fashion!
        </h1>
        <p className="text-green-700 mb-6">
          Explore our curated collection of stylish clothing and accessories tailored to your unique taste.
        </p>
        <button className="bg-green-700 text-white py-2 px-6 rounded hover:bg-green-800">
          Explore Now
        </button>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-12">
        <Image
          src={banner}
          alt="Fashion Model"
          className="max-w-full h-auto rounded-lg"
        />
      </div>
    </section>
  );
};

export default Hero;
