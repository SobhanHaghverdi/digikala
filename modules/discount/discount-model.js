import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";

const Discount = sequelize.define(
  "discount",
  {
    limit: DataTypes.INTEGER,
    usage: DataTypes.INTEGER,
    expires_in: DataTypes.DATE,
    productId: DataTypes.INTEGER,
    code: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    percent: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM("basket", "product"), allowNull: false },
  },
  { createdAt: "created_at", updatedAt: false, freezeTableName: true }
);

export default Discount;
