const OrderStatus = Object.freeze({
  Packed: "packed",
  Pending: "pending",
  Ordered: "ordered",
  Canceled: "canceled",
  Delivered: "delivered",
  InProcess: "in-process",
  InTransit: "in-transit",
});

export default OrderStatus;
