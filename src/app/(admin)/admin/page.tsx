import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UserRole } from "@/generated/prisma/client";
import { AdminEventTabs } from "@/components/admin-event-tabs";
import { CloudinaryCleanupButton } from "@/components/cloudinary-cleanup-button";
import {
  findPendingEvents,
  findApprovedEvents,
  findRejectedEvents,
} from "@/resources/events/queries";

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect("/sign-in");

  const role = session.user.role;
  if (role !== UserRole.ADMIN && role !== UserRole.MODERATOR) redirect("/");

  const [pending, approved, rejected] = await Promise.all([
    findPendingEvents(),
    findApprovedEvents(),
    findRejectedEvents(),
  ]);

  return (
    <main className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Event Moderation</h1>
          <p className="text-muted-foreground text-sm mt-1">Review and manage submitted events.</p>
        </div>
        <CloudinaryCleanupButton />
      </div>
      <AdminEventTabs pending={pending} approved={approved} rejected={rejected} />
    </main>
  );
}
