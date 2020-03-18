import dotenv from "dotenv";
dotenv.config();

import Sequelize from "sequelize";

import UserModel from "../models/user";

const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DIALECT,
  DATABASE_PORT
} = process.env;

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: DIALECT,
    port: DATABASE_PORT,
    logging: false
  }
);

const User = UserModel(sequelize, Sequelize);

sequelize
  .sync({ force: false })
  .then(() => {
    return console.log(`Database & tables created!`);
  })
  .catch(err => console.log(err));

module.exports = {
  User
};
