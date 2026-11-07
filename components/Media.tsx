import Image from "next/image";
import { cn } from "@/lib/cn";
import { getVoice, type Img } from "@/lib/content";
import { ImageIcon } from "./icons";

/**
 * Shows an image if `img.src` is set. Otherwise it shows a placeholder with the
 * suggested image-generation prompt (your prompt + the imageStyle from content/voice.md).
 * Generate the image, save it in public/images/, then add `src: /images/your-file.jpg`.
 */
export function Media({
  img,
  ratio = "4/3",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  className,
  showPrompt = true,
}: {
  img: Img;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  showPrompt?: boolean;
}) {
  const frame = cn("relative w-full overflow-hidden rounded-card bg-bg-subtle", className);

  if (img.src) {
    return (
      <div className={frame} style={{ aspectRatio: ratio }}>
        <Image src={img.src} alt={img.alt ?? ""} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  const style = getVoice().imageStyle;
  const prompt = [img.prompt, style].filter(Boolean).join(". Style: ");
  return <Placeholder ratio={ratio} prompt={prompt} className={className} showPrompt={showPrompt} />;
}

export function Placeholder({
  ratio = "4/3",
  prompt,
  label = "Image to generate",
  className,
  showPrompt = true,
}: {
  ratio?: string;
  prompt?: string;
  label?: string;
  className?: string;
  showPrompt?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={prompt ? `Placeholder: ${prompt}` : "Image placeholder"}
      data-prompt={prompt}
      className={cn(
        "relative isolate flex w-full flex-col items-center justify-center overflow-hidden rounded-card bg-bg-subtle p-6 text-center",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {/* soft glow + dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 30% 20%, color-mix(in oklab, var(--color-accent) 10%, transparent), transparent 70%), radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--color-fg) 14%, transparent) 1px, transparent 0)",
          backgroundSize: "100% 100%, 18px 18px",
        }}
      />
      <span className="mb-3 inline-flex size-10 items-center justify-center rounded-full bg-bg-elevated text-fg-subtle shadow-card">
        <ImageIcon />
      </span>
      <p className="text-caption font-medium tracking-wide text-fg-subtle uppercase">{label}</p>
      {showPrompt && prompt && (
        <p className="mt-2 line-clamp-3 max-w-md font-mono text-caption text-fg-subtle select-all">{prompt}</p>
      )}
    </div>
  );
}
