import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "@fastify/jwt";
import userRoute from "./module/user/user.route";
import { userSchema } from "./module/user/user.schema";

export const fastify = Fastify({
  logger: true,
});
const port = 8090;

declare module "fastify" {
  export interface FastifyInstance {
    authentication: any;
  }
}

fastify.register(fastifyJwt, {
  secret:
    "52424dgd363sdf4131lkjsdfljjr3jri87734y28424y82hfiuhwirryvj1314!rkfjf",
});

fastify.decorate(
  "authentication",
  async function (req: FastifyRequest, res: FastifyReply) {
    try {
      await req.jwtVerify();
    } catch (e: any) {
      console.error(e);
      return res.status(500).send({ error: e.message });
    }
  }
);

//register validation shema for user route
for (const schema of userSchema) {
  fastify.addSchema(schema);
}

// register route
fastify.register(userRoute, { prefix: "api/user" });

fastify.listen({ port, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is running on port : ${address}`);
});
