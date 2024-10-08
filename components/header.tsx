import type { PropsWithChildren } from "react";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggler } from "@/components/theme-toggler";
import { LinkButton } from "@/components/link-button";
import { DisplayEventCount } from "@/components/display-event-count";

type HeaderProps = PropsWithChildren;

export const Header = ({ children }: HeaderProps) => {
  return (
    <>
      <header className="sticky print:relative h-16 rounded-b top-0 bg-background/10 z-10 backdrop-blur-lg flex items-center">
        <div className="px-4 sm:px-2 py-4 container max-w-4xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xl text-balance sm:text-2xl font-bold tracking-tight"
            >
              NYC Anime Events
            </Link>
            <div>
              <DisplayEventCount />
            </div>
            <ThemeToggler className="sm:hidden" />
          </div>
          <nav className="sm:flex items-center gap-2 hidden print:hidden">
            <LinkButton size="sm" href="/" label="Home" leftIcon={HomeIcon} />
            {children}
            <ThemeToggler />
          </nav>
          <div className="block sm:hidden">
            <MobileNav>{children}</MobileNav>
          </div>
        </div>
      </header>
    </>
  );
};
