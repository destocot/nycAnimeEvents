import * as v from "valibot";

export const SignInSchema = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(6)),
});

export const SignUpSchema = v.object({
  name: v.pipe(v.string(), v.minLength(2), v.maxLength(60)),
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(6)),
});
