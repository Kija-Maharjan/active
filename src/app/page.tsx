import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import LogoShowcase from "@/components/LogoShowcase";
import About from "@/components/About";
import Equipment from "@/components/Equipment";
import WorkoutPlans from "@/components/WorkoutPlans";
import Plans from "@/components/Plans";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <LogoShowcase />
      <About />
      <Equipment />
      <WorkoutPlans />
      <Plans />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}
