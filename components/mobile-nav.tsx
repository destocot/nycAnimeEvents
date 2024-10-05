"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { MenuIcon, XCircleIcon } from "lucide-react";

type MobileNavProps = PropsWithChildren;

export const MobileNav = ({ children }: MobileNavProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]); // Re-run effect when `open` changes

  if (!children) return null;

  return (
    <div className="sm:hidden">
      {open ? (
        <div
          ref={ref}
          className="p-4 bg-background/90 flex-col fixed w-1/2 top-0 right-0 z-20 flex items-center h-full"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent close on button click
              setOpen(false); // Close modal
            }}
            className="self-end"
          >
            <XCircleIcon />
          </Button>
          <ul className="mt-4 flex flex-col gap-4 w-full">{children}</ul>
        </div>
      ) : (
        <div className="absolute top-0 right-0 z-20 flex items-center h-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation(); // Prevent closing the modal immediately
              setOpen(true); // Open modal
            }}
          >
            <MenuIcon />
          </Button>
        </div>
      )}
    </div>
  );
};
