import { Link } from "next-view-transitions";
import { LockKeyhole } from "lucide-react";

export const SignupClosedCallout = () => (
  <main className="flex-1 flex items-center justify-center px-4 py-16">
    <div className="w-full max-w-sm text-center space-y-4">
      <div className="flex justify-center">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center">
          <LockKeyhole className="size-5 text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-1">
        <h2 className="font-semibold text-sm">Registration closed</h2>
        <p className="text-xs text-muted-foreground">
          New accounts are not available at this time.
        </p>
      </div>
      <Link href="/sign-in" className="text-xs text-primary hover:underline">
        Back to sign in
      </Link>
    </div>
  </main>
);
