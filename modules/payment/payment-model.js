import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";

const Payment = sequelize.define(
  "payment",
  {
    refId: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    authority: DataTypes.STRING,
    amount: { type: DataTypes.DECIMAL, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    updatedAt: false,
    freezeTableName: true,
    createdAt: "created_at",
    indexes: [{ fields: ["orderId", "userId"] }],
  }
);

export default Payment;
