"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = __importDefault(require("../app/user/controller"));
const user_1 = require("../lib/schemas/user");
const userRoutes = async (app) => {
  app.route({
    method: "GET",
    url: "/me",
    schema: user_1.currentUserSchema,
    //@ts-expect-error authenticate object does not exists on app's instance
    preHandler: [app?.authenticate],
    handler: controller_1.default.currentUser,
  });
};
exports.default = userRoutes;
