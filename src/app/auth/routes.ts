import { FastifyInstance } from "fastify";
import AuthController from "./controller";
import { loginSchema, signupSchema } from "./schemas";

const authRoutes = async (app: FastifyInstance) => {
  app.route({
    method: "POST",
    url: "/signup",
    schema: signupSchema,
    handler: AuthController.signup,
  });

  app.route({
    method: "POST",
    url: "/login",
    schema: loginSchema,
    handler: AuthController.login,
  });
};

export default authRoutes;
