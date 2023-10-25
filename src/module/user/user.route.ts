import { FastifyInstance } from "fastify";
import { createUserHandler } from "./user.controller";

export default async function (fastify: FastifyInstance) {
  fastify.get("/", createUserHandler);
}
