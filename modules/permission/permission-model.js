import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";

const Permission = sequelize.define(
  "permission",
  {
    description: DataTypes.STRING,
    title: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false, freezeTableName: true }
);

export default Permission;
