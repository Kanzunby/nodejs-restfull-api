import express from "express";
import { publicRouter } from "../router/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../router/api.js";

export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
