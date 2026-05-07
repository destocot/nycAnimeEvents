import { PauseCircle } from "lucide-react";

export const SubmissionsPausedCallout = () => (
  <main className="flex-1 flex items-center justify-center px-4 py-16">
    <div className="w-full max-w-sm text-center space-y-4">
      <div className="flex justify-center">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center">
          <PauseCircle className="size-5 text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-1">
        <h2 className="font-semibold text-sm">Submissions temporarily paused</h2>
        <p className="text-xs text-muted-foreground">
          We&apos;re working through a backlog of events. Check back soon.
        </p>
      </div>
    </div>
  </main>
);
