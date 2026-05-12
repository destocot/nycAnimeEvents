"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const NavSearchBar = () => {
  const router = useTransitionRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(() => searchParams.get("q") ?? "");

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    const trimmed = value.trim();
    router.push(
      trimmed.length >= 3
        ? `/events?q=${encodeURIComponent(trimmed)}`
        : "/events",
    );
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search events..."
        className="pl-9"
      />
    </form>
  );
};

export const NavSearch = () => (
  <div className="flex-1 max-w-sm">
    <Suspense>
      <NavSearchBar />
    </Suspense>
  </div>
);
