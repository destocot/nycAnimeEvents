import { Fragment } from "react";
import type { PropsWithChildren } from "react";
import { MobileNav } from "@/components/mobile-nav";
import Link from "next/link";

type HeaderProps = PropsWithChildren;

export const Header = ({ children }: HeaderProps) => {
  return (
    <Fragment>
      <header className="sticky h-20 rounded-b top-0 bg-background/10 z-10 backdrop-blur-lg flex items-center">
        <div className="px-2 py-4 container max-w-4xl mx-auto flex justify-between items-center gap-2">
          <Link
            href="/"
            className="text-xl text-balance sm:text-2xl font-bold tracking-tight"
          >
            Upcoming NYC Anime Events
          </Link>
          <nav className="sm:flex items-center gap-2 hidden">{children}</nav>
        </div>
      </header>
      <MobileNav>{children}</MobileNav>
    </Fragment>
  );
};
