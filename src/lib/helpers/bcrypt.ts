import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Exception from "./Exception";
import { AUTH_CONSTANTS } from "../../app/auth/constants";
import { HTTP_STATUS } from "../constants/api";

dotenv.config();

export const EncryptPassword = async (password: string) => {
  const encryptedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUND)
  );

  return encryptedPassword;
};

export const ComparePassword = async (password: string, hash: string) => {
  const result = await bcrypt.compare(password, hash);

  if (!result) {
    throw new Exception(
      AUTH_CONSTANTS.PASSWORD_MISMATCH,
      HTTP_STATUS.UNAUTHORIZED_401
    );
  }

  return result;
};
