import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Journey } from "@/components/Journey";
import { Repertoire } from "@/components/Repertoire";
import { Gallery } from "@/components/Gallery";
import { Stage } from "@/components/Stage";
import { Management } from "@/components/Management";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Preloader />
      <RevealObserver />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Journey />
        <Repertoire />
        <Gallery />
        <Stage />
        <Management />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
