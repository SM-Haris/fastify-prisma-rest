import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const EncryptPassword = async (password: string) => {
  const encryptedPassword = await bcrypt.hash(
    password,
    Number(process.env.BCRYPT_SALT_ROUND),
  );

  return encryptedPassword;
};

export const ComparePassword = async (password: string, hash: string) => {
  const result = await bcrypt.compare(password, hash);

  if (!result) {
    throw new Error("Password is incorrect");
  }

  return result;
};
