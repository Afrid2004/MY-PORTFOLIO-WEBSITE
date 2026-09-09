
import About from "@/components/pages/Home/About";
import Certifications from "@/components/pages/Home/Certifications";
import EducationalBackground from "@/components/pages/Home/EducationlBackground";
import Hero from "@/components/pages/Home/Hero";
import Projects from "@/components/pages/Home/Projects";
import Services from "@/components/pages/Home/Services";
import Skills from "@/components/pages/Home/Skills";
import Stats from "@/components/pages/Home/Stats";
import Testimonials from "@/components/pages/Home/Testimonial";
import WorkExperience from "@/components/pages/Home/WorkExperience";
import Blog from "./blog/page";

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

      {/* services section */}
      <Services></Services>

      {/* workexperience section */}
      <WorkExperience></WorkExperience>

      {/* EducationalBackground section */}
      <EducationalBackground></EducationalBackground>

      {/* projects section */}
      <Projects></Projects>

      {/* certifications section */}
      <Certifications></Certifications>

      {/* blog section */}
      <Blog></Blog>

      {/* testimonial section */}
      <Testimonials></Testimonials>
    </div>
  );
}
