import prisma from "../../lib/helpers/prisma";
import { SignUpRequestBody } from "../../lib/types/auth";

export const fetchSingleUser = async (user_id: string) => {
  return await prisma.user.findFirstOrThrow({
    where: {
      id: user_id as string,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findFirstOrThrow({
    where: {
      email: email as string,
    },
  });
};

export const createUser = async (data: SignUpRequestBody) => {
  return await prisma.user.create({
    data: data,
  });
};
