import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";

const Basket = sequelize.define(
  "basket",
  {
    sizeId: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    discountId: DataTypes.INTEGER,
    userId: { type: DataTypes.INTEGER, allowNull: false },
    count: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: false, freezeTableName: true }
);

export default Basket;
