import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";

const OrderItem = sequelize.define(
  "order_item",
  {
    sizeId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    count: { type: DataTypes.INTEGER, allowNull: false },
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
    freezeTableName: true,
    indexes: [{ fields: ["orderId", "productId"] }],
  }
);

export default OrderItem;
