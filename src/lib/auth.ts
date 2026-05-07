import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins/admin";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { UserRole } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { ac, roles } from "@/lib/permissions";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  advanced: {
    database: { generateId: false },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    minPasswordLength: 6,
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email" && process.env.NEXT_PUBLIC_SIGNUP_ENABLED !== "true") {
        throw new APIError("FORBIDDEN", {
          message: "Registration is currently closed.",
        });
      }
    }),
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "MODERATOR", "ADMIN"] as Array<UserRole>,
        input: false,
      },
    },
  },
  plugins: [
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN, UserRole.MODERATOR],
      ac,
      roles,
    }),
  ],
});
