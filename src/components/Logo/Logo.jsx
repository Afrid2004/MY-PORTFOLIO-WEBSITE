import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="w-full">
      <Link href={"/"}>
        <Image
          className="w-full object-cover"
          width={1000}
          height={1000}
          src={"/assets/images/logo.png"}
        />
      </Link>
    </div>
  );
};

export default Logo;
