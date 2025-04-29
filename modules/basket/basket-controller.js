import basketService from "./basket-service.js";

async function upsert(req, res) {
  await basketService.upsert({
    ...req.body,
    userId: req.user?.id,
  });

  return res.json({ message: "Added to basket successfully" });
}

const basketController = { upsert };
export default basketController;
