export const metadata = {
  title: "Blogs | Muhammed Faisal Yousuf Afrid",

  description:
    "Explore practical articles, tutorials, and insights about Laravel, React.js, Next.js, JavaScript, PHP, databases, and modern web development.",

  keywords: [
    "Muhammed Faisal Yousuf Afrid Blog",
    "Web Development Blog",
    "Laravel Blog",
    "Laravel Tutorials",
    "React.js Blog",
    "React.js Tutorials",
    "Next.js Blog",
    "Next.js Tutorials",
    "JavaScript Blog",
    "PHP Blog",
    "Web Development Tutorials",
  ],

  alternates: {
    canonical: "/blogs",
  },

  openGraph: {
    title: "Blogs | Muhammed Faisal Yousuf Afrid",

    description:
      "Explore practical articles, tutorials, and insights about Laravel, React.js, Next.js, JavaScript, PHP, databases, and modern web development.",

    url: "https://faisalfreelancer.com/blogs",

    siteName: "Muhammed Faisal Yousuf Afrid",

    images: [
      {
        url: "https://pub-34bcafdece07465c8d280278b20ecf5b.r2.dev/seo/blogs.png",
        width: 1200,
        height: 630,
        alt: "Muhammed Faisal Yousuf Afrid - Web Development Blogs",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Blogs | Muhammed Faisal Yousuf Afrid",

    description:
      "Practical articles, tutorials, and insights about Laravel, React.js, Next.js, JavaScript, PHP, and modern web development.",

    images: [
      "https://pub-34bcafdece07465c8d280278b20ecf5b.r2.dev/seo/blogs.png",
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

export default function BlogsLayout({ children }) {
  return children;
}
