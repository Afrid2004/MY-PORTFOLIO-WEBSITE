import Navbar from "@/components/layouts/Header/Navbar";
import Footer from "@/components/layouts/Footer/Footer";

export default function FrontendLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
