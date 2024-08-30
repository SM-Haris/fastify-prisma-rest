"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class Authentication {}
_a = Authentication;
Authentication.AuthMiddleware = async (req, reply) => {
  try {
    const decoded = await req.jwtVerify();
    req.user = decoded.id;
  } catch (err) {
    reply.status(403).send(err);
  }
};
exports.default = Authentication;
