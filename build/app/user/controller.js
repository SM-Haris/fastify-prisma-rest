"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = __importDefault(require("./manager"));
class UserController {}
_a = UserController;
UserController.currentUser = async (req, reply) => {
  try {
    const user = await manager_1.default.currentUser(req.user);
    reply.send({ user: user });
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
};
exports.default = UserController;
