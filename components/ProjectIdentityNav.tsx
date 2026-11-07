import Link from "next/link";
import Image from "next/image";
import { getProjectWorld } from "@/lib/project-worlds";

export function ProjectIdentityNav({ slug, active = "story" }: { slug: string; active?: "story" | "system" }) {
  const world = getProjectWorld(slug);
  if (!world) return null;
  return <nav className="project-identity-nav" aria-label={`${world.name} project`}>
    <Link className="project-wordmark" href={`/projects/${slug}`}>{world.logo && <Image className="project-logo" src={world.logo.src} width={world.logo.width} height={world.logo.height} alt="" />}{world.name}</Link>
    <div className="project-identity-links">
      <Link href={`/projects/${slug}`} aria-current={active === "story" ? "page" : undefined}>Case study</Link>
      <Link href={`/projects/${slug}/design-system`} aria-current={active === "system" ? "page" : undefined}>Design system</Link>
    </div>
  </nav>;
}
