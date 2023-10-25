import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, getAllUser } from "./user.service";
import { CreateUserInput, CreateUserLoginInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { fastify } from "../..";

export async function getAllUserHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const users = await getAllUser();
    if (users.length < 1)
      return res.status(400).send({ error: "user cannot find" });

    return res.status(200).send(users);
  } catch (e: any) {
    console.error(e);
    return res.status(500).send(e);
  }
}

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
    const user = await findUserByEmail(req.body.email);
    if (!user) return res.status(401).send({ error: "invalid email" });

    const validPassword = verifyPassword(
      req.body.password,
      user.salt,
      user.password
    );

    if (!validPassword)
      return res.status(401).send({ error: "invalid password" });

    const { password, salt, ...rest } = user;

    return res.status(200).send({
      accessToken: fastify.jwt.sign(rest, {
        expiresIn: "1m",
      }),
    });
  } catch (e: any) {
    console.error(e);
    return res.status(500).send(e);
  }
}
