import { prismaClient } from "../src/apps/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestContacts = async (authorId) => {
  await prismaClient.contact.deleteMany({
    where: {
      authorId: authorId,
    },
  });
};

export const createTestContact = async (authorId) => {
  await prismaClient.contact.create({
    data: {
      authorId: authorId,
      first_name: "test",
      last_name: "test",
      email: "test@gmail.com",
      phone: "083465748",
    },
  });
};

export const createManyTestContact = async (authorId) => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        authorId: authorId,
        first_name: `test ${i}`,
        last_name: `test ${i}`,
        email: `test${i}@gmail.com`,
        phone: `083465748${i}`,
      },
    });
  }
};

export const getTestContact = async (authorId) => {
  return prismaClient.contact.findFirst({
    where: {
      authorId: authorId,
    },
  });
};
