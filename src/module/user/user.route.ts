import { FastifyInstance } from "fastify";
import {
  createUserHandler,
  getAllUserHandler,
  loginUserHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

export default async function (fastify: FastifyInstance) {
  fastify.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createuserResponseSchema"),
        },
      },
    },
    createUserHandler
  );

  fastify.post(
    "/login",
    {
      schema: {
        body: $ref("createUserLoginSchema"),
        response: {
          200: $ref("createUserLoginResponseSchema"),
        },
      },
    },
    loginUserHandler
  );
  fastify.get(
    "/all",
    { preHandler: [fastify.authentication] },
    getAllUserHandler
  );
}
