"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparePassword = exports.EncryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const EncryptPassword = async (password) => {
  const encryptedPassword = bcrypt_1.default.hash(
    password,
    process.env.BCRYPT_SALT_ROUND,
  );
  return encryptedPassword;
};
exports.EncryptPassword = EncryptPassword;
const ComparePassword = async (password, hash) => {
  const result = bcrypt_1.default.compare(password, hash);
  if (!result) {
    // make this a constant
    throw new Error("Password is incorrect");
  }
  return result;
};
exports.ComparePassword = ComparePassword;
