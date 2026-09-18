import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Category from "@/components/Category";
import BestSeller from "@/components/BestSeller";
import Footer from "@/components/Footer";
import TrustedBy from "@/components/TrustedBy";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs"
import Cta from "@/components/Cta";
import Scroll from "@/components/Scroll";
import Counter from "@/components/Counter";

export default function Home() {
  return (
    <main>
      <TopBar />
      <Nav />
      <Hero />
      <TrustedBy/>
      <About/>
      <Scroll/>
      {/* <BestSeller /> */}
      <WhyChooseUs/>
      <Counter/>
      <Category/>
      <Cta/>
      <Footer />
    </main>
  );
}