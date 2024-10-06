"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { MenuIcon, XCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type MobileNavProps = PropsWithChildren;

export const MobileNav = ({ children }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const themeTogglerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        ref.current &&
        !ref.current.contains(target) &&
        themeTogglerRef.current &&
        !themeTogglerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]);

  if (!children) return null;

  return open ? (
    <div
      ref={ref}
      className="py-3 px-6 bg-background/90 flex-col fixed w-1/3 top-0 right-0 z-30 flex items-center h-full animate-slideInRight"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setOpen(false);
        }}
        className="self-end"
      >
        <XCircleIcon />
      </Button>
      <ul className="mt-4 flex flex-col gap-2 w-full">{children}</ul>
    </div>
  ) : (
    <div className="sm:hidden fixed top-0 right-2 z-20 flex items-center h-20">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setOpen(true);
        }}
      >
        <MenuIcon />
      </Button>
    </div>
  );
};
