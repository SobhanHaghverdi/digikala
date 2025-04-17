import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";
import ProductType from "../../common/constant/product-enum.js";

const Product = sequelize.define(
  "product",
  {
    description: DataTypes.TEXT(800),
    count: { type: DataTypes.INTEGER, defaultValue: 0 },
    price: { type: DataTypes.DECIMAL, allowNull: true },
    discount: { type: DataTypes.INTEGER, defaultValue: 0 },
    title: { type: DataTypes.STRING(200), allowNull: false },
    active_discount: { type: DataTypes.BOOLEAN, defaultValue: false },
    type: {
      allowNull: false,
      type: DataTypes.ENUM(Object.values(ProductType)),
    },
  },
  {
    freezeTableName: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ fields: ["title"] }],
  }
);

export default Product;
