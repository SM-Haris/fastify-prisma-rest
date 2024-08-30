"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
exports.routes = {
  "/user": user_1.default,
  "/auth": auth_1.default,
};
