import { Router } from "express";
import authGuard from "../auth/auth-guard.js";
import permissionController from "./permission-controller.js";

const permissionRouter = Router();
permissionRouter.post("/", authGuard, permissionController.create);

export default permissionRouter;
