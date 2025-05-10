import Otp from "../modules/otp/otp-model.js";
import Role from "../modules/role/role-model.js";
import User from "../modules/user/user-model.js";
import Order from "../modules/order/order-model.js";
import Basket from "../modules/basket/basket-model.js";
import Payment from "../modules/payment/payment-model.js";
import Product from "../modules/product/product-model.js";
import Discount from "../modules/discount/discount-model.js";
import OrderItem from "../modules/order-item/order-item-model.js";
import Permission from "../modules/permission/permission-model.js";
import ProductSize from "../modules/product-size/product-size-model.js";
import ProductColor from "../modules/product-color/product-color-model.js";
import ProductDetail from "../modules/product-detail/product-detail-model.js";
import RolePermission from "../modules/role-permission/role-permission-model.js";

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

  Discount.hasMany(Basket, {
    as: "basket",
    sourceKey: "id",
    foreignKey: "discountId",
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

  Basket.belongsTo(Discount, {
    as: "discount",
    targetKey: "id",
    foreignKey: "discountId",
  });

  //#endregion

  //#region Order Relations

  Order.hasOne(Payment, {
    foreignKey: "orderId",
    sourceKey: "id",
    as: "payment",
  });

  Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    sourceKey: "id",
    as: "items",
  });

  User.hasMany(Payment, {
    foreignKey: "userId",
    sourceKey: "id",
    as: "payments",
  });

  User.hasMany(Order, { foreignKey: "userId", sourceKey: "id", as: "orders" });
  OrderItem.belongsTo(Order, { foreignKey: "orderId", targetKey: "id" });

  Payment.hasOne(Order, {
    foreignKey: "paymentId",
    sourceKey: "id",
    as: "order",
  });

  OrderItem.belongsTo(Product, {
    as: "product",
    targetKey: "id",
    foreignKey: "productId",
  });

  OrderItem.belongsTo(ProductColor, {
    as: "color",
    targetKey: "id",
    foreignKey: "colorId",
  });

  OrderItem.belongsTo(ProductSize, {
    as: "size",
    targetKey: "id",
    foreignKey: "sizeId",
  });

  //#endregion

  //#region RBAC Relations

  Role.hasMany(RolePermission, {
    foreignKey: "roleId",
    sourceKey: "id",
    as: "permissions",
  });

  Permission.hasMany(RolePermission, {
    foreignKey: "permissionId",
    sourceKey: "id",
    as: "roles",
  });

  RolePermission.belongsTo(Role, { foreignKey: "roleId", targetKey: "id" });

  RolePermission.belongsTo(Permission, {
    foreignKey: "permissionId",
    targetKey: "id",
  });

  //#endregion

  // sequelize.sync({ force: true });
}

export default registerRelations;
