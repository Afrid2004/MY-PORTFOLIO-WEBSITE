import { Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/Provider/NextAuthProvieder";
import SmoothScroll from "@/components/SmoothScroll";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
      <html lang="en" className={`${poppins.className} antialiased`}>
        <body>
          <SmoothScroll>{children}</SmoothScroll>
        </body>
      </html>
    </NextAuthProvider>
  );
}
