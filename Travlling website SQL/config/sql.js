const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "travel_sql",
  "root",
  "pranay1123",   
  {
    host: "localhost",
    dialect: "mysql",
    timezone: "+05:30"
  }
);

module.exports = sequelize;
