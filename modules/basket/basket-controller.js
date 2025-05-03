import basketService from "./basket-service.js";

async function getUserBasket(req, res) {
  const baskets = await basketService.getAllByUserId(req.params.userId);
  return res.json(baskets);
}

async function upsert(req, res) {
  await basketService.upsert({
    ...req.body,
    userId: req.user?.id,
  });

  return res.json({ message: "Added to basket successfully" });
}

const basketController = { upsert, getUserBasket };
export default basketController;
