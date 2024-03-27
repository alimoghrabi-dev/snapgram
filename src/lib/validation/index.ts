import * as z from "zod";

export const SignUpValidationSchema = z.object({
  name: z.string().min(2, { message: "Too Short" }),
  username: z.string().min(2, { message: "Too Short" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 6 characters" }),
});

export const SignInValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 6 characters" }),
});

export const postValidatonSchema = z.object({
  caption: z
    .string()
    .min(5, { message: "Too Short" })
    .max(100, { message: "Too Long" }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(5, { message: "Too Short" })
    .max(50, { message: "Too Long" }),
  tags: z.string(),
});
