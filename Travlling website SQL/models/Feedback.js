const { DataTypes } = require("sequelize");
const sequelize = require("../config/sql");

const Feedback = sequelize.define("Feedback", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  message: DataTypes.TEXT,
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending" 
  }
});

module.exports = Feedback;