export const siteConfig = {
  name: "TechToJob",
  url: "https://techtojob.com",
  email: "contacto@techtojob.com",
  discordUrl: "https://discord.gg/h9FFgKdkRd",
  social: {
    linkedin: "https://www.linkedin.com/company/techtojob/",
    x: "https://x.com/techtojob",
    instagram: "https://www.instagram.com/techtojob",
  },
  /** Endpoint the newsletter form posts to. Empty until the mailing list exists. */
  newsletterEndpoint: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT ?? "",
} as const;
