export default function robots() {
  const baseUrl = "https://faisalfreelancer.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
