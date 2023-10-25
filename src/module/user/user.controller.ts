import { FastifyReply, FastifyRequest } from "fastify";

export async function createUserHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  return { status: 200 };
}
