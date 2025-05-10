import { Router } from "express";
import authGuard from "../auth/auth-guard.js";
import rolePermissionController from "./role-permission-controller.js";
import rolePermissionValidator from "./role-permission-validation.js";

const rolePermissionRouter = Router();

rolePermissionRouter.post(
  "/many",
  authGuard,
  rolePermissionValidator,
  rolePermissionController.createMany
);

export default rolePermissionRouter;
