import { Router } from "express";
import authGuard from "../auth/auth-guard.js";
import roleController from "./role-controller.js";

const roleRouter = Router();
roleRouter.post("/", authGuard, roleController.create);

export default roleRouter;
