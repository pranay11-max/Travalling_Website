const { DataTypes } = require("sequelize");
const sequelize = require("../config/sql");

const Package = sequelize.define("Package", {
  title: DataTypes.STRING,
  location: DataTypes.STRING,
  price: DataTypes.INTEGER,
  days: DataTypes.INTEGER,
  description: DataTypes.TEXT,
  good_points: DataTypes.TEXT,
  bad_points: DataTypes.TEXT,
  
  // --- हे २ नवीन कॉलम्स आपण ॲड केले आहेत ---
  image_url: DataTypes.TEXT, // TEXT वापरलंय कारण फोटोची लिंक खूप मोठी असू शकते
  vibe: DataTypes.STRING,

  // models/Package.js मध्ये हे ॲड कर
  itinerary: DataTypes.TEXT, // यामध्ये आपण "London Eye, Madame Tussauds, River Thames" असं लिहू शकतो.

  
});

module.exports = Package;