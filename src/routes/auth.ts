import { FastifyInstance } from "fastify";
import AuthController from "../app/auth/authController";
import { loginSchema, signupSchema } from "../lib/schemas/auth";

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
