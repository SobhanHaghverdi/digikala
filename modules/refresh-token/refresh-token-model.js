import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";

const RefreshToken = sequelize.define(
  "refresh_token",
  {
    token: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { createdAt: "created_at", updatedAt: false, freezeTableName: true }
);

export default RefreshToken;
