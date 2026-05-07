"use client";

import { Link } from "next-view-transitions";
import { useTransitionRouter } from "next-view-transitions";
import { LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/generated/prisma/enums";
import { authClient } from "@/lib/auth-client";

export const NavbarAuth = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useTransitionRouter();

  if (isPending) return null;

  if (!session) return null;

  if (session.user.role !== UserRole.ADMIN && session.user.role !== UserRole.MODERATOR) return null;

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="max-w-[160px] truncate">
          {session.user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal truncate">
          {session.user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/admin" className="flex items-center gap-2">
            <LayoutDashboard className="size-3.5" />
            Admin
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2">
          <LogOut className="size-3.5" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
