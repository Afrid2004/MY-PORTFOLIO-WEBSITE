import { getIcon } from "@/lib/iconLoader";
import React from "react";

const SocialLoader = ({ defaultClass }) => {
  const socialData = [
    {
      name: "GitHub",
      icon: "FaGithub",
      link: "https://github.com/afrid2004",
    },
    {
      name: "LinkedIn",
      icon: "FaLinkedin",
      link: "https://www.linkedin.com/in/md-faisal-yousuf-afrid/",
    },
    {
      name: "Facebook",
      icon: "FaFacebook",
      link: "https://www.facebook.com/faisalyousuf.afrid",
    },
    {
      name: "Email",
      icon: "HiOutlineEnvelope",
      link: "mailto:mdfaisalafrid@gmail.com",
    },
  ];
  return socialData.map((data, idx) => {
    const Icon = getIcon(data.icon);
    return (
      <a key={idx} target="_blank" href={data.link} className={defaultClass}>
        <Icon size={20} />
      </a>
    );
  });
};

export default SocialLoader;
