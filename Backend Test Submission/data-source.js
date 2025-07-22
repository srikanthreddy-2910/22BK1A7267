require("dotenv").config();
const { DataSource } = require("typeorm");

const User = require("./entity.js");

const isProduction = process.env.NODE_ENV === "production";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: ["query", "error"],
  entities: [User],
  migrations: ["./migrations/*.js"],
  subscribers: [],
});

module.exports = AppDataSource;
