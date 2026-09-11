import { Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/Provider/NextAuthProvieder";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Faisal Afrid | Junior Full Stack Developer",
  description:
    "Portfolio of Md Faisal Yousuf Afrid, a Junior Full Stack Web Developer.",
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html lang="en" className={`${poppins.className} h-full antialiased`}>
        <body>{children}</body>
      </html>
    </NextAuthProvider>
  );
}
