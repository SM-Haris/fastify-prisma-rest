import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { LoginRequestBody, SignUpRequestBody } from "../../lib/types/auth";
import prisma from "../../lib/helpers/prisma";

class AuthController {
  static signup: RouteHandlerMethod = async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { username, email, password } = req.body as SignUpRequestBody;

    try {
      await prisma.user.create({
        data: {
          username,
          email,
          password,
        },
      });

      reply.send({ message: "User created successfully" });
    } catch {
      reply.status(400).send({ error: "User already exists or invalid data!" });
    }
  };

  static login: RouteHandlerMethod = async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { email, password } = req.body as LoginRequestBody;

    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          email: email,
          password: password,
        },
      });

      const access = req.server.jwt.sign({ id: user.id });
      const refresh = req.server.jwt.sign({ id: user.id }, { expiresIn: "7d" });

      reply.send({
        access,
        refresh,
      });
    } catch {
      reply
        .status(400)
        .send({ error: "No active user with these credentials exist" });
    }
  };
}

export default AuthController;
