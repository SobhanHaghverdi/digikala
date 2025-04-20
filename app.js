import "express-async-errors";
import express from "express";
import "./config/sequelize-config.js";
import registerRelations from "./config/relation-config.js";

const PORT = process.env.PORT ?? 5000;

async function configureServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  registerRelations();

  app.use((req, res, next) => {
    return res.status(404).json({ message: "Endpoint does not exists" });
  });

  app.use((error, req, res, next) => {
    let status = error?.status ?? error?.statusCode ?? error?.code;

    if (!status || isNaN(+status) || status > 511 || status < 200) {
      status = 500;
    }

    return res.status(status).json({
      data: { body: req.body, query: req.query },
      message: error?.message ?? error?.stack ?? "Internal Server Error",
    });
  });

  app.listen(PORT);
}

configureServer()
  .then(() => console.log(`Server is running on http://localhost:${PORT}`))
  .catch((error) => console.log(error));
