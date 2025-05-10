import roleService from "./role-service.js";

async function create(req, res) {
  await roleService.create(req.body);
  return res.json({ message: "Role created successfully !" });
}

const roleController = { create };
export default roleController;
