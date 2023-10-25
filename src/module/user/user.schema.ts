import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const coreUserSchema = {
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
};

export const createUserSchema = z
  .object({
    ...coreUserSchema,
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

export const createuserResponseSchema = z.object({
  ...coreUserSchema,
  id: z.number(),
});

export const createUserLoginSchema = z.object({
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
});

export const createUserLoginResponseSchema = z.object({
  accessToken: z.string(),
});

export type CreateUserInput = Omit<
  z.infer<typeof createUserSchema>,
  "confirm_password"
>;

export type CreateUserLoginInput = z.infer<typeof createUserLoginSchema>;

export const { schemas: userSchema, $ref } = buildJsonSchemas({
  createUserSchema,
  createuserResponseSchema,
  createUserLoginSchema,
  createUserLoginResponseSchema,
});
