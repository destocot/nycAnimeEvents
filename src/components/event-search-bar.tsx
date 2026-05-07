"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { usePathname, useSearchParams } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const EventSearchBar = () => {
  const router = useTransitionRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(() => searchParams.get("q") ?? "");
  const [debouncedValue] = useDebounce(value, 400);

  useEffect(() => {
    if (debouncedValue.length >= 3) {
      router.replace(`/events?q=${encodeURIComponent(debouncedValue)}`);
    } else if (debouncedValue.length === 0 && pathname === "/events") {
      router.replace("/events");
    }
  }, [debouncedValue, pathname, router]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search events..."
        className="pl-9 pr-9"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 size-7"
          onClick={() => setValue("")}
        >
          <X className="size-3.5" />
        </Button>
      )}
    </div>
  );
};
