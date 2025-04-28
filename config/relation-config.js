import Otp from "../modules/otp/otp-model.js";
import User from "../modules/user/user-model.js";
import Basket from "../modules/basket/basket-model.js";
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

  //#region Basket Relations

  Product.hasMany(Basket, {
    as: "basket",
    sourceKey: "id",
    foreignKey: "productId",
  });

  ProductColor.hasMany(Basket, {
    as: "basket",
    sourceKey: "id",
    foreignKey: "colorId",
  });

  ProductSize.hasMany(Basket, {
    as: "basket",
    sourceKey: "id",
    foreignKey: "sizeId",
  });

  User.hasMany(Basket, {
    as: "basket",
    sourceKey: "id",
    foreignKey: "userId",
  });

  Basket.belongsTo(Product, {
    as: "product",
    targetKey: "id",
    foreignKey: "productId",
  });

  Basket.belongsTo(User, {
    as: "user",
    targetKey: "id",
    foreignKey: "userId",
  });

  Basket.belongsTo(ProductColor, {
    as: "color",
    targetKey: "id",
    foreignKey: "colorId",
  });

  Basket.belongsTo(ProductSize, {
    as: "size",
    targetKey: "id",
    foreignKey: "sizeId",
  });

  //#endregion
}

export default registerRelations;
