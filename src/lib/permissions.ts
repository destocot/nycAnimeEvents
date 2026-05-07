import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
import { UserRole } from "@/generated/prisma/enums";

const statements = {
  ...defaultStatements,
} as const;

export const ac = createAccessControl(statements);

export const roles = {
  [UserRole.USER]: ac.newRole({
    user: [],
    session: [],
  }),
  [UserRole.MODERATOR]: ac.newRole({
    user: ["list", "get"],
    session: ["list"],
  }),
  [UserRole.ADMIN]: ac.newRole({
    ...adminAc.statements,
  }),
};
