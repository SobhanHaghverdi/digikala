import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";
import OrderStatus from "../../common/constant/order-enum.js";

const Order = sequelize.define(
  "order",
  {
    reason: DataTypes.TEXT,
    paymentId: DataTypes.INTEGER,
    discount_amount: DataTypes.DECIMAL,
    address: { type: DataTypes.TEXT, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    total_amount: { type: DataTypes.DECIMAL, allowNull: false },
    final_amount: { type: DataTypes.DECIMAL, allowNull: false },
    status: {
      defaultValue: OrderStatus.Pending,
      type: DataTypes.ENUM(Object.values(OrderStatus)),
    },
  },
  {
    updatedAt: false,
    freezeTableName: true,
    createdAt: "created_at",
    indexes: [{ fields: ["paymentId", "userId"] }],
  }
);

export default Order;
