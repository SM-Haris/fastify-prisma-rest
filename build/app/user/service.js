"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUserByEmail = exports.fetchSingleUser = void 0;
const prisma_1 = __importDefault(require("../../lib/helpers/prisma"));
const fetchSingleUser = async (user_id) => {
  return await prisma_1.default.user.findFirstOrThrow({
    where: {
      id: user_id,
    },
  });
};
exports.fetchSingleUser = fetchSingleUser;
const findUserByEmail = async (email) => {
  return await prisma_1.default.user.findFirstOrThrow({
    where: {
      email: email,
    },
  });
};
exports.findUserByEmail = findUserByEmail;
const createUser = async (data) => {
  return await prisma_1.default.user.create({
    data: data,
  });
};
exports.createUser = createUser;
