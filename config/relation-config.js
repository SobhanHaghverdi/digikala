import Otp from "../modules/otp/otp-model.js";
import User from "../modules/user/user-model.js";
import Product from "../modules/product/product-model.js";
import ProductSize from "../modules/product-size/product-size-model.js";
import ProductColor from "../modules/product-color/product-color-model.js";
import ProductDetail from "../modules/product-detail/product-detail-model.js";

function registerRelations() {
  //#region Product Relations

  Product.hasMany(ProductDetail, {
    as: "details",
    sourceKey: "id",
    onDelete: "CASCADE",
    foreignKey: "productId",
  });

  ProductDetail.belongsTo(Product, {
    targetKey: "id",
    foreignKey: "productId",
  });

  Product.hasMany(ProductColor, {
    as: "colors",
    sourceKey: "id",
    onDelete: "CASCADE",
    foreignKey: "productId",
  });

  ProductColor.belongsTo(Product, { foreignKey: "productId", targetKey: "id" });

  Product.hasMany(ProductSize, {
    as: "sizes",
    sourceKey: "id",
    onDelete: "CASCADE",
    foreignKey: "productId",
  });

  ProductSize.belongsTo(Product, { foreignKey: "productId", targetKey: "id" });

  //#endregion

  //#region User Relations

  User.hasOne(Otp, {
    as: "otp",
    sourceKey: "id",
    onDelete: "CASCADE",
    foreignKey: "userId",
  });

  Otp.hasOne(User, {
    as: "user",
    sourceKey: "id",
    foreignKey: "otpId",
    onDelete: "CASCADE",
  });

  Otp.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

  //#endregion
}

export default registerRelations;
