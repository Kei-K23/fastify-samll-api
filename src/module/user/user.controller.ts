import { FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "./user.service";
import { CreateUserInput, CreateUserLoginInput } from "./user.schema";

export async function createUserHandler(
  req: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  res: FastifyReply
) {
  try {
    const payload = req.body;
    const user = await createUser(payload);

    return res.status(201).send(user);
  } catch (e: any) {
    console.error(e);
    return res.status(500).send(e);
  }
}

export async function loginUserHandler(
  req: FastifyRequest<{
    Body: CreateUserLoginInput;
  }>,
  res: FastifyReply
) {
  try {
    req.body.
  } catch (e: any) {
    console.error(e);
    return res.status(500).send(e);
  }
}
