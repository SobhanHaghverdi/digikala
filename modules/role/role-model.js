import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";

const Role = sequelize.define(
  "role",
  {
    description: DataTypes.STRING,
    title: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false, freezeTableName: true }
);

export default Role;
