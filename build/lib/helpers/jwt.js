"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthTokens = void 0;
const getAuthTokens = (req, user_id) => {
  const access = req.server.jwt.sign({ id: user_id }, { expiresIn: "1d" });
  const refresh = req.server.jwt.sign({ id: user_id }, { expiresIn: "7d" });
  return { access, refresh };
};
exports.getAuthTokens = getAuthTokens;
