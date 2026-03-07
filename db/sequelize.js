import { Sequelize } from "sequelize";
import "dotenv/config";

const { DB_URI } = process.env;

if (!DB_URI) {
  console.error("No DB_URI set in environment variables");
  process.exit(1);
}

export const sequelize = new Sequelize(DB_URI, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: true
  },
});
