import prisma from "../../lib/helpers/prisma";
import { SignUpRequestBody } from "../auth/types";

export const fetchSingleUser = async (user_id: string) => {
  return await prisma.user.findFirst({
    where: {
      id: user_id as string,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
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

export const findByNameOrEmail = async (username: string, email: string) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: username,
          email: email,
        },
      ],
    },
  });
};
