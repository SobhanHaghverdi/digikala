import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";

const User = sequelize.define(
  "user",
  {
    otpId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    mobile: { type: DataTypes.STRING, allowNull: false },
  },
  { createdAt: "created_at", updatedAt: false, freezeTableName: true }
);

export default User;
