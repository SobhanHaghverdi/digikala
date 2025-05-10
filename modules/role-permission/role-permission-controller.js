import rolePermissionService from "./role-permission-service.js";

async function createMany(req, res) {
  await rolePermissionService.createMany(req.body);
  return res.json({ message: "Role permissions created successfully !" });
}

const rolePermissionController = { createMany };
export default rolePermissionController;
