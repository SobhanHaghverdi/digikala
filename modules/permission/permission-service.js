import { Op } from "sequelize";
import createHttpError from "http-errors";
import Permission from "./permission-model.js";

async function getCountByIds(ids) {
  return await Permission.count({ where: { id: { [Op.in]: ids } } });
}

async function create(dto) {
  dto.title = dto?.title?.trim();

  const doesPermissionExists = await Permission.findOne({
    where: { title: dto?.title },
    raw: true,
  });

  if (doesPermissionExists) {
    throw createHttpError(409, "Permission already exists");
  }

  return await Permission.create(dto, { raw: true });
}

const permissionService = { create, getCountByIds };
export default permissionService;
