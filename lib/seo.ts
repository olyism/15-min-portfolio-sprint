import { getResume, getSite } from "./content";

export function absoluteUrl(path = "/") {
  return new URL(path, getSite().url).toString();
}

/** schema.org Person, built from site.json and resume.json. */
export function personSchema() {
  const site = getSite();
  const resume = getResume();
  const current = resume.experience[0];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    email: `mailto:${site.email}`,
    address: site.location,
    sameAs: site.socials.map((s) => s.url),
    knowsAbout: resume.skills.flatMap((s) => s.items),
    ...(current && current.end.toLowerCase() === "present"
      ? { worksFor: { "@type": "Organization", name: current.company } }
      : {}),
  };
}
