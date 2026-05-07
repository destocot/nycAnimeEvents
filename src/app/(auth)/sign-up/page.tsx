import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SignUpForm } from "./sign-up-form";
import { SignupClosedCallout } from "@/components/signup-closed-callout";

export default async function SignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/");
  const signupEnabled = process.env.NEXT_PUBLIC_SIGNUP_ENABLED === "true";
  return signupEnabled ? <SignUpForm /> : <SignupClosedCallout />;
}
