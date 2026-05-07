import { Link } from "next-view-transitions";
import { NavbarAuth } from "./navbar-auth";
import { NavSearch } from "./search-nav";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="font-bold tracking-tight text-sm shrink-0">
          NYC Anime Events
        </Link>

        <NavSearch />

        <ThemeToggle />

        <nav className="flex items-center gap-4 text-sm text-muted-foreground shrink-0 ml-auto">
          <Link href="/events" className="hover:text-foreground transition-colors">
            Events
          </Link>
          <Link href="/submit" className="hover:text-foreground transition-colors">
            Submit
          </Link>
        </nav>

        <NavbarAuth />
      </div>
    </header>
  );
}
