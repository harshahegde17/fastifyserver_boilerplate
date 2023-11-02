import { FastifyInstance } from "fastify";
import { loginSchema } from "../schema";
import * as controllers from "../controllers";


async function userRouter(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/login",
    schema: loginSchema,
    handler: controllers.login,
  });
}

export default userRouter;
