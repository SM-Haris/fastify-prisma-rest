import { FastifyReply, FastifyRequest } from "fastify";
import { DecodedJwtToken } from "../lib/types/auth";
import { HTTP_STATUS } from "../lib/constants/api";

export const authenticationMiddleware = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const decoded = (await req.jwtVerify()) as DecodedJwtToken;
    req.user = decoded.id;
  } catch (err) {
    res.status(HTTP_STATUS.FORBIDDEN_403).send(err);
  }
};
