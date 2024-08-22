import {Dialect, Sequelize} from "sequelize";
import 'dotenv/config'
import "reflect-metadata";

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbPassword = process.env.DB_PASSWORD as string
const dbHost = process.env.DB_HOST as string

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql" as Dialect,
  host: dbHost,
  timezone: '-03:00'
});

export default sequelize
