import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <nav className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          Your Name
        </Link>
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
