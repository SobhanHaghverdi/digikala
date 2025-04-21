import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";

const Otp = sequelize.define(
  "otp",
  {
    code: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    expires_in: { type: DataTypes.DATE, allowNull: false },
  },
  { timestamps: false, freezeTableName: true }
);

export default Otp;
