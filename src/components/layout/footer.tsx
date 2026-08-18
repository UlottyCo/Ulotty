import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-black/60 dark:text-white/60">
        © {new Date().getFullYear()} {siteConfig.name}
      </div>
    </footer>
  );
}
