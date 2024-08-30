import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const EncryptPassword = async (password: string) => {
  const encryptedPassword = bcrypt.hash(
    password,
    process.env.BCRYPT_SALT_ROUND as string
  );

  return encryptedPassword;
};

export const ComparePassword = async (password: string, hash: string) => {
  const result = bcrypt.compare(password, hash);

  if (!result) {
    // make this a constant
    throw new Error("Password is incorrect");
  }

  return result;
};
