import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted">
        © {new Date().getFullYear()} {siteConfig.name}
      </div>
    </footer>
  );
}
