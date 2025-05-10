import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";

const RolePermission = sequelize.define(
  "role_permission",
  {
    roleId: { type: DataTypes.INTEGER, allowNull: false },
    permissionId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: false, freezeTableName: true }
);

export default RolePermission;
