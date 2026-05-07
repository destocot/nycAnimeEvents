import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { UserRole } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { EventStatus } from "@/generated/prisma/enums";
import { SubmitForm } from "./submit-form";
import { SubmissionsPausedCallout } from "@/components/submissions-paused-callout";

const PENDING_LIMIT = 20;

export default async function SubmitPage() {
  const [session, pendingCount] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    prisma.event.count({ where: { status: EventStatus.PENDING } }),
  ]);

  const isPrivileged =
    session?.user.role === UserRole.ADMIN || session?.user.role === UserRole.MODERATOR;

  if (pendingCount >= PENDING_LIMIT && !isPrivileged) {
    return <SubmissionsPausedCallout />;
  }

  return <SubmitForm />;
}
