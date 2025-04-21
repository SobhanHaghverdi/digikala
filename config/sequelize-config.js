import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  logging: false,
  dialect: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USER_NAME,
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => {
    console.log("Database connection failed !");
    console.log(error);
  });

export default sequelize;
