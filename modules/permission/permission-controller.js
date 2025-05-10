import permissionService from "./permission-service.js";

async function create(req, res) {
  await permissionService.create(req.body);
  return res.json({ message: "Permission created successfully !" });
}

const permissionController = { create };
export default permissionController;
