export default function ContactPage() {
  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Get in touch
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          Replace this with your preferred way to be contacted: email, calendar link, or a contact form. Edit app/contact/page.tsx.
        </p>
        <a
          href="mailto:you@example.com"
          className="inline-block px-6 py-3 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity"
        >
          Email me
        </a>
      </div>
    </div>
  );
}
