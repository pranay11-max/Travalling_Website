const { DataTypes } = require("sequelize");
const sequelize = require("../config/sql");

const Lead = sequelize.define("Lead", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  message: DataTypes.TEXT,
  status: {
    type: DataTypes.STRING,
    defaultValue: "new"
  },
  packageId: DataTypes.INTEGER   // 👈 ADD THIS
});

module.exports = Lead;
