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
  
  // --- आधीचे कॉलम्स ---
  image_url: DataTypes.TEXT, // TEXT वापरलंय कारण फोटोची लिंक खूप मोठी असू शकते
  vibe: DataTypes.STRING,
  itinerary: DataTypes.TEXT, // यामध्ये आपण "London Eye, Madame Tussauds, River Thames" असं लिहू शकतो.

  // --- 🚀 हा नवीन कॉलम आपण पॅकेजेसचा क्रम (Sequence) ठरवण्यासाठी ॲड केलाय ---
  order_index: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Package;