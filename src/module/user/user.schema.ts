import { date, z } from "zod";

export const createUserSchema = z
  .object({
    name: z
      .string({
        required_error: "name is required",
        invalid_type_error: "name shoud be string",
      })
      .min(2, "name should include at least 3 characters"),
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "email shoud be string",
      })
      .email("invalid email format"),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(6, "password must be at least 6 characters long"),
    confirm_password: z
      .string({
        required_error: "confirm password is required",
      })
      .min(6, "confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "confirm password does not match",
    path: ["confirm_password"],
  });

export type CreateUserInput = Omit<
  z.infer<typeof createUserSchema>,
  "confirm_password"
>;
