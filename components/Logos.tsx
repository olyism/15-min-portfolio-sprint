export default function Logos() {
  const logos = [
    { name: "Company 1", width: 120 },
    { name: "Company 2", width: 120 },
    { name: "Company 3", width: 120 },
  ];
  return (
    <section className="py-12 px-4 border-y border-neutral-100 dark:border-neutral-800">
      <p className="text-center text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-8">
        Worked with / Featured in
      </p>
      <div className="mx-auto max-w-4xl flex flex-wrap items-center justify-center gap-12">
        {logos.map((logo) => (
          <div
            key={logo.name}
            className="h-8 flex items-center justify-center text-neutral-400 dark:text-neutral-500 text-sm"
            style={{ width: logo.width }}
          >
            {logo.name}
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-neutral-400 dark:text-neutral-500 mt-4">
        Replace with your own logos (images or text) in components/Logos.tsx
      </p>
    </section>
  );
}
