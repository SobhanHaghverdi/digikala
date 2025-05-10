import Role from "./role-model.js";
import createHttpError from "http-errors";

async function getById(id) {
  return await Role.findByPk(id, { raw: true });
}

async function create(dto) {
  dto.title = dto?.title?.trim();

  const doesRoleExists = await Role.findOne({
    where: { title: dto?.title },
    raw: true,
  });

  if (doesRoleExists) throw createHttpError(409, "Role already exists");
  return await Role.create(dto, { raw: true });
}

const roleService = { create, getById };
export default roleService;
