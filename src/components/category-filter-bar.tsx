"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { categoryLabel, HIDDEN_CATEGORIES } from "@/lib/event-utils";

const CATEGORIES = Object.keys(categoryLabel).filter(
  (c) => !HIDDEN_CATEGORIES.has(c)
) as (keyof typeof categoryLabel)[];

export const CategoryFilterBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = searchParams.get("cat") ?? "";

  const toggle = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (active === cat) {
      params.delete("cat");
    } else {
      params.set("cat", cat);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => toggle(cat)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              isActive
                ? "bg-foreground text-background border-foreground"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/25"
            }`}
          >
            {categoryLabel[cat]}
          </button>
        );
      })}
    </div>
  );
};
