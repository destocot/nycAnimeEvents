"use client";

import { Link } from "next-view-transitions";
import { useTransitionRouter } from "next-view-transitions";
import { useForm, Form, Field, setErrors } from "@formisch/react";
import * as v from "valibot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { SignInSchema } from "@/resources/auth/validators";

export const SignInForm = () => {
  const router = useTransitionRouter();
  const form = useForm({ schema: SignInSchema });

  async function handleSubmit(values: v.InferOutput<typeof SignInSchema>) {
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });
    if (error) {
      setErrors(form, { errors: [error.message ?? "Invalid credentials"] });
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Welcome back to NYC Anime Events</CardDescription>
        </CardHeader>

        <Form of={form} onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Field of={form} path={["email"]}>
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...field.props}
                    value={field.input ?? ""}
                  />
                  {field.errors && (
                    <p className="text-xs text-destructive">{field.errors[0]}</p>
                  )}
                </div>
              )}
            </Field>

            <Field of={form} path={["password"]}>
              {(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••"
                    {...field.props}
                    value={field.input ?? ""}
                  />
                  {field.errors && (
                    <p className="text-xs text-destructive">{field.errors[0]}</p>
                  )}
                </div>
              )}
            </Field>
          </CardContent>

          <CardFooter className="flex-col gap-3 pt-2">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <p className="text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Form>
      </Card>
    </main>
  );
};
