import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 dark:text-neutral-400">
        <p>© {new Date().getFullYear()} Your Name. Built with the 15-Minute Portfolio Sprint template.</p>
        <div className="flex gap-6">
          <Link href="/projects" className="hover:text-neutral-700 dark:hover:text-neutral-300">
            Projects
          </Link>
          <Link href="/blog" className="hover:text-neutral-700 dark:hover:text-neutral-300">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-neutral-700 dark:hover:text-neutral-300">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
