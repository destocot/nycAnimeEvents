import { Suspense } from "react";
import { Link } from "next-view-transitions";
import { NavbarAuth } from "./navbar-auth";
import { NavSearchBar } from "./search-nav";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-14 flex items-center gap-3">
          <Link href="/" className="font-bold tracking-tight text-sm shrink-0">
            NYC Anime Events
          </Link>

          <div className="hidden sm:block flex-1 max-w-sm">
            <Suspense>
              <NavSearchBar />
            </Suspense>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <nav className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/events" className="hover:text-foreground transition-colors">
                Events
              </Link>
              <Link href="/submit" className="hover:text-foreground transition-colors">
                Submit
              </Link>
            </nav>
            <ThemeToggle />
            <NavbarAuth />
          </div>
        </div>

        <div className="sm:hidden flex items-center gap-3 pb-2">
          <div className="flex-1">
            <Suspense>
              <NavSearchBar />
            </Suspense>
          </div>
          <nav className="flex items-center gap-3 text-sm text-muted-foreground shrink-0">
            <Link href="/events" className="hover:text-foreground transition-colors">
              Events
            </Link>
            <Link href="/submit" className="hover:text-foreground transition-colors">
              Submit
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
