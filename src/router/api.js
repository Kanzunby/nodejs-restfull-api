import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user.controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get("/api/users/current", userController.getUser);
userRouter.patch("/api/users/current", userController.updateUser);
userRouter.delete("/api/users/logout", userController.logout);

export { userRouter };
