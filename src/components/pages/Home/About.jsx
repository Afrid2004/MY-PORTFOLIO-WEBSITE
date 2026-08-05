import Image from "next/image";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import { FiAward, FiCheck, FiMail, FiMapPin, FiUser } from "react-icons/fi";
import { HiOutlineEnvelope } from "react-icons/hi2";

const About = () => {
  return (
    <section className="relative py-16 lg:py-28 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-12 lg:gap-16">
          <div className="col-span-12 lg:col-span-5 lg:h-full mt-5 lg:mt-0 order-2 lg:order-0">
            <div className="w-full h-full">
              <div className="gradient-border rounded-sm p-0.5 h-full">
                <div className="bg-base-100 p-4 h-full">
                  <div>
                    <div className="gradient-border bg-base-100 rounded-sm p-px">
                      <div className="bg-base-100 rounded-sm overflow-hidden">
                        <Image
                          src="/assets/images/faisalimage.png"
                          alt="Faisal"
                          width={600}
                          height={600}
                          className="w-full h-[450px] md:h-[600px] lg:h-[450px] object-cover object-top"
                        />
                      </div>
                    </div>

                    <div className="shrink-0">
                      <div className="mt-5 text-center">
                        <h3 className="text-xl font-semibold">
                          MD Faisal Yousuf Afrid
                        </h3>

                        <p className="mt-1 text-sm text-base-content/60">
                          Junior Full Stack Developer
                        </p>
                      </div>

                      <div className="mt-5 flex justify-center gap-3">
                        <a
                          href="#"
                          className="w-11 h-11 rounded-full border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary hover:-translate-y-1 transition-all"
                        >
                          <FaGithub size={18} />
                        </a>
                        <a
                          href="#"
                          className="w-11 h-11 rounded-full border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary hover:-translate-y-1 transition-all"
                        >
                          <FaLinkedin size={18} />
                        </a>
                        <a
                          href="#"
                          className="w-11 h-11 rounded-full border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary hover:-translate-y-1 transition-all"
                        >
                          <FaFacebook size={18} />
                        </a>
                        <a
                          href="#"
                          className="w-11 h-11 rounded-full border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary hover:-translate-y-1 transition-all"
                        >
                          <HiOutlineEnvelope size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="gradient-border w-fit p-0.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-base-100 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-sm font-medium uppercase tracking-wider">
                  About Me
                </span>
              </div>
            </div>

            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Building <span className="text-primary">Modern </span> Web
              Applications
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-base-content/90 mb-5">
              I'm a Junior Full Stack Developer passionate about building
              modern, scalable, and high-performance web applications. I
              specialize in creating responsive user interfaces, developing
              reliable backend systems, and delivering seamless digital
              experiences. With a strong focus on clean code, performance, and
              usability, I enjoy turning ideas into functional products that
              solve real-world problems.
            </p>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="gradient-border p-0.5 rounded-sm h-full">
                  <div className="bg-base-100 p-5 rounded-sm h-full">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <FiUser className="shrink-0" /> Name
                    </div>
                    <div>Muhammed Faisal Yousuf Afrid</div>
                  </div>
                </div>
                <div className="gradient-border p-0.5 rounded-sm h-full">
                  <div className="bg-base-100 p-5 rounded-sm h-full">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <FiMail className="shrink-0" /> Email
                    </div>
                    <div>mdfaisalafrid@gmail.com</div>
                  </div>
                </div>
                <div className="gradient-border p-0.5 rounded-sm h-full">
                  <div className="bg-base-100 p-5 rounded-sm h-full">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <FiMapPin className="shrink-0" /> Location
                    </div>
                    <div>Merul Badda, Gulshan, Dhaka-1212</div>
                  </div>
                </div>
                <div className="gradient-border p-0.5 rounded-sm h-full">
                  <div className="bg-base-100 p-5 rounded-sm h-full">
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <FiCheck className="shrink-0" /> Availability
                    </div>
                    <div>Open to work</div>
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
