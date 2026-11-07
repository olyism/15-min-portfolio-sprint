import Image from "next/image";
import type { ProjectDemo } from "@/lib/project-demos";
import { getProjectWorld } from "@/lib/project-worlds";

/** Generated product artwork. Interactive exercises are separate from these images. */
export function ProjectVisual({ theme, compact = false, priority = false }: {
  theme: string; demo?: ProjectDemo; compact?: boolean; priority?: boolean;
}) {
  const world = getProjectWorld(theme);
  if (!world) return null;
  return <div data-world={theme} className={`project-artwork${compact ? " is-compact" : ""}`}>
    <Image src={world.hero.src} alt={world.hero.alt} width={world.hero.width} height={world.hero.height}
      sizes={compact ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 1280px) 100vw, 1216px"}
      priority={priority} className="project-artwork-image" />
  </div>;
}
