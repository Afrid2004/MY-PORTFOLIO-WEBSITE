import About from "@/components/pages/Home/About";
import Hero from "@/components/pages/Home/Hero";
import Skills from "@/components/pages/Home/Skills";
import Stats from "@/components/pages/Home/Stats";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* hero section  */}
      <Hero></Hero>

      {/* stats  */}
      <Stats></Stats>

      {/* about section  */}
      <About></About>

      {/* skills section */}
      <Skills></Skills>
    </div>
  );
}
