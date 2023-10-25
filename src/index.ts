import Fastify from "fastify";
import userRoute from "./module/user/user.route";

const fastify = Fastify({
  logger: true,
});
const port = 8090;

// register route
fastify.register(userRoute, { prefix: "api/user" });

fastify.listen({ port, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server is running on port : ${address}`);
});
