import createHttpError from "http-errors";
import roleService from "../role/role-service.js";
import RolePermission from "./role-permission-model.js";
import permissionService from "../permission/permission-service.js";

async function createMany(dto) {
  let { permissions = [] } = dto;

  const role = await roleService.getById(dto.roleId);
  if (!role) throw createHttpError(404, "Role not found");

  if (permissions?.length > 0) {
    const permissionsCount = await permissionService.getCountByIds(permissions);

    if (permissionsCount !== permissions.length) {
      throw createHttpError(400, "Send correct list of permissions");
    }

    const permissionsList = permissions.map((id) => ({
      roleId: role.id,
      permissionId: id,
    }));

    await RolePermission.bulkCreate(permissionsList);
  }
}

const rolePermissionService = { createMany };
export default rolePermissionService;
