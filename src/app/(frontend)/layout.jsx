import Navbar from "@/components/layouts/Header/Navbar";
import Footer from "@/components/layouts/Footer/Footer";
import ContactFAB from "@/components/Buttons/ContactFAB";

export const metadata = {
  title: "Muhammed Faisal Yousuf Afrid | Full Stack Web Developer",
  description:
    "Muhammed Faisal Yousuf Afrid is a Full Stack Web Developer specializing in Laravel, React.js, Next.js, PHP, and modern web development.",

  keywords: [
    "Muhammed Faisal Yousuf Afrid",
    "Md Faisal Yousuf Afrid",
    "Faisal Yousuf Afrid",
    "Full Stack Web Developer",
    "Laravel Developer",
    "React.js Developer",
    "Next.js Developer",
    "PHP Developer",
    "Full Stack Web Developer Bangladesh",
    "Web Developer Bangladesh",
  ],

  authors: [
    {
      name: "Muhammed Faisal Yousuf Afrid",
      url: "https://faisalfreelancer.com",
    },
  ],

  creator: "Muhammed Faisal Yousuf Afrid",
  publisher: "Muhammed Faisal Yousuf Afrid",

  metadataBase: new URL("https://faisalfreelancer.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Muhammed Faisal Yousuf Afrid | Full Stack Web Developer",
    description:
      "Portfolio of Muhammed Faisal Yousuf Afrid, a Full Stack Web Developer specializing in Laravel, React.js, Next.js, PHP, and modern web technologies.",
    url: "https://faisalfreelancer.com",
    siteName: "Muhammed Faisal Yousuf Afrid",
    images: [
      {
        url: "https://pub-34bcafdece07465c8d280278b20ecf5b.r2.dev/seo/home.png",
        width: 1200,
        height: 630,
        alt: "Muhammed Faisal Yousuf Afrid - Full Stack Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Muhammed Faisal Yousuf Afrid | Full Stack Web Developer",
    description:
      "Full Stack Web Developer specializing in Laravel, React.js, Next.js, and PHP.",
    images: [
      "https://pub-34bcafdece07465c8d280278b20ecf5b.r2.dev/seo/home.png",
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function FrontendLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />

      <ContactFAB />
    </div>
  );
}
