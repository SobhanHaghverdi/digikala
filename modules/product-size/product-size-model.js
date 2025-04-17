import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";

const ProductSize = sequelize.define(
  "product_size",
  {
    size: { type: DataTypes.STRING, allowNull: false },
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.DECIMAL, defaultValue: 0 },
    discount: { type: DataTypes.INTEGER, defaultValue: 0 },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    active_discount: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: false, freezeTableName: true }
);

export default ProductSize;
