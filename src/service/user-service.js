import { validate } from "../validation/validation.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import { prismaClient } from "../apps/database.js";
import { ResponseErrorr } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

// Register Service
const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseErrorr(400, "Username already exist");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

// Login Service
const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseErrorr(401, "Username or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseErrorr(401, "Username or password wrong");
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: {
      token: token,
    },
    select: {
      token: true,
    },
  });
};

// Get User
const getUser = async (dataUsername) => {
  const username = validate(getUserValidation, dataUsername);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseErrorr(404, "User is not found");
  }

  return user;
};

export default { register, login, getUser };
