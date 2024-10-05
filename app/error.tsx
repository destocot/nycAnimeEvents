"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

const DisplayableErrors = ["Unauthorized"];

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const message = DisplayableErrors.includes(error.message)
    ? error.message
    : "Something went wrong!";

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex gap-4 items-center flex-col h-[calc(100vh-3.5rem)] justify-center">
      <h2 className="text-2xl font-bold tracking-tight text-destructive">
        {message}
      </h2>
      <Button size="lg" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
