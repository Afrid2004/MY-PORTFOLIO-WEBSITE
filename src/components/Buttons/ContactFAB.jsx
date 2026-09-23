"use client";

import { useEffect, useState } from "react";
import { FiMessageSquare, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";

const ContactFAB = () => {
  const [showFAB, setShowFAB] = useState(false);

  const phoneNumber = "8801345802911";

  const whatsappMessage = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Hi Faisal, I found your portfolio and would like to discuss a project.",
  )}`;

  const messenger = "https://m.me/faisalyousuf.afrid";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowFAB(true);
      } else {
        setShowFAB(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ${
        showFAB
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="fab fab-flower">
        {/* Main Button */}
        <div
          tabIndex={0}
          role="button"
          className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primary text-black cursor-pointer transition-transform duration-200 active:scale-[0.95]"
        >
          {/* Shine */}
          <span className="pointer-events-none absolute inset-y-0  -top-2 -left-1/2 w-1/2 rotate-12 bg-white/70 blur-[2px] animate-fab-shine" />

          <FiMessageSquare size={24} className="relative z-10" />
        </div>

        {/* Messenger */}
        <a
          href={messenger}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-accent-content border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary"
          aria-label="Messenger"
        >
          <RiMessengerLine size={26} />
        </a>

        {/* Call */}
        <a
          href={`tel:+${phoneNumber}`}
          className="w-11 h-11 rounded-full bg-accent-content border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary"
          aria-label="Call Faisal"
        >
          <FiPhone size={20} />
        </a>

        {/* WhatsApp Message */}
        <a
          href={whatsappMessage}
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-accent-content border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary"
          aria-label="WhatsApp Message"
        >
          <FaWhatsapp size={26} />
        </a>
      </div>
    </div>
  );
};

export default ContactFAB;
