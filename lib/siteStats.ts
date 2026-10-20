import siteContent from "@/data/site-content.json";

/**
 * Derived statistics. Everything is computed from data/site-content.json so
 * counts stay correct whenever a project or certification is added/removed.
 */
const { featuredProjects, certifications, profile } = siteContent;

export const liveProjectCount = featuredProjects.filter((p) => Boolean(p.liveUrl)).length;
export const certificationCount = certifications.filter((c) => c.type === "certification").length;
export const anthropicCredentialCount = certifications.filter(
  (c) => c.type === "certification" && c.issuer.includes("Anthropic")
).length;

export const cvUrl = profile.cvUrl;
export const cvFileName = profile.cvFileName;
