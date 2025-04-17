import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize-config.js";

const ProductDetail = sequelize.define(
  "product_detail",
  {
    key: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: false, freezeTableName: true }
);

export default ProductDetail;
