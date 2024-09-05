
import BestSelling from "@/app/src/sections/bestselling";
import OurProducts from "@/app/src/sections/ourproducts";
import ExclusiveOffer from "@/app/src/sections/Exlusiveoffers";
import Hero from "@/app/src/sections/Hero";
import Contact from "@/app/src/sections/contact";

import DesignerClothes from "@/app/src/sections/Designers";
import TestimonialCard from "@/app/src/sections/Feedbacks";
import ReduxProvider from '@/app/src/lib/provider'; 
// pages/index.tsx
export default function Home() {
  return (
    <ReduxProvider>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-center text-center">
          <div data-aos="fade-up" data-aos-delay="400">
            <section id="Home">
              <Hero />
            </section>
            <section id="Shop">
              <BestSelling />
              <OurProducts />
            </section>
            <section id="Features">
              <ExclusiveOffer />
              <DesignerClothes />
              <TestimonialCard />
            </section>
            <section id="contact">
          <Contact/>
            </section>
          </div>
        </div>
      </main>
    </ReduxProvider>
  );
}
