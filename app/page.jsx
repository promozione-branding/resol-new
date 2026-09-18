import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Category from "@/components/Category";
import BestSeller from "@/components/BestSeller";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import TrustedBy from "@/components/TrustedBy";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs"
import Cta from "@/components/Cta";

export default function Home() {
  return (
    <main>
      <TopBar />
      <Nav />
      <Hero />
      <TrustedBy/>
      <About/>
      
      {/* <BestSeller /> */}
      <WhyChooseUs/>
      <Category/>
      <Cta/>
      <CtaBand />
      <Footer />
    </main>
  );
}