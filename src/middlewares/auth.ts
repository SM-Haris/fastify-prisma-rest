import { FastifyReply, FastifyRequest, onRequestHookHandler } from "fastify";
import { DecodedJwtToken } from "../lib/types/auth";

class Authentication {
  static AuthMiddleware: onRequestHookHandler = async (
    req: FastifyRequest,
    reply: FastifyReply
  ) => {
    try {
      const decoded = (await req.jwtVerify()) as DecodedJwtToken;
      req.user = decoded.id;
    } catch (err) {
      reply.send(err);
    }
  };
}

export default Authentication;
