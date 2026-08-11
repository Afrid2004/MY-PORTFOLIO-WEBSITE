import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="w-full">
      <Link href={"/"}>
        <Image
          className="w-full object-cover"
          width={160}
          height={33}
          alt="Faisal"
          src={"/assets/images/faisallogo.png"}
        />
      </Link>
    </div>
  );
};

export default Logo;
