// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   "travel_sql",
//   "root",
//   "pranay1123",   
//   {
//     host: "localhost",
//     dialect: "mysql",
//     timezone: "+05:30"
//   }
// );

// module.exports = sequelize;



const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') }); 

const { Sequelize } = require("sequelize");

console.log("------------------------------------");
console.log("ENV DB USER:", process.env.DB_USER);
console.log("------------------------------------");

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      ssl: { rejectUnauthorized: false }
    }
  }
);

module.exports = sequelize;