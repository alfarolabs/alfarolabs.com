import { person, works } from "./site";

export const SITE_ORIGIN = "https://alfarolabs.com";

export const routes = [
  "/",
  "/work",
  ...works.map((work) => `/work/${work.slug}`),
  "/method",
  "/engage",
  "/contact",
] as const;

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: "Software engineer",
  worksFor: {
    "@type": "Organization",
    name: person.studio,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: person.location,
  },
  email: person.email,
  url: SITE_ORIGIN,
  sameAs: [person.github, person.x],
};
