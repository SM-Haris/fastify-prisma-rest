import { FastifyRequest } from "fastify";

export const getAuthTokens = (req: FastifyRequest, user_id: string) => {
  const access = req.server.jwt.sign({ id: user_id }, { expiresIn: "1d" });
  const refresh = req.server.jwt.sign({ id: user_id }, { expiresIn: "7d" });

  return { access, refresh };
};
