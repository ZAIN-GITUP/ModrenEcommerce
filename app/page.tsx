
import BestSelling from "@/app/src/sections/bestselling";
import OurProducts from "@/app/src/sections/ourproducts";
import ExclusiveOffer from "@/app/src/sections/Exlusiveoffers";
import Hero from "@/app/src/sections/Hero";
import DesignerClothes from "@/app/src/sections/Designers";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  ">
      <div className="flex flex-col items-center justify-center text-center">
       
        <div data-aos="fade-up" data-aos-delay="400">
        <Hero/>
          <BestSelling/>
          
          <ExclusiveOffer/>
          <DesignerClothes/>
        </div>
      </div>
    </main>
  );
}
