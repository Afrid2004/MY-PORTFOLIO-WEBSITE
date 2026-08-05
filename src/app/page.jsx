import About from "@/components/pages/Home/About";
import Hero from "@/components/pages/Home/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* hero section  */}
      <Hero></Hero>

      {/* about section  */}
      <About></About>
    </div>
  );
}
