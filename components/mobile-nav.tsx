"use client";

import { PropsWithChildren, useState } from "react";
import { HomeIcon, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LinkButton } from "@/components/link-button";

type MobileNavProps = PropsWithChildren;

export const MobileNav = ({ children }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  if (!children) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-1/2">
        <SheetHeader>
          <SheetTitle className="text-left">Nav</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-2">
          <li>
            <LinkButton href="/" label="Home" leftIcon={HomeIcon} />
          </li>
          {children}
        </ul>
      </SheetContent>
    </Sheet>
  );
};
