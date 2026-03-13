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



// १. आधी Sequelize इंपोर्ट करा (हे विसरू नकोस!)
const { Sequelize } = require("sequelize");

// २. मग डोकं लावून हार्डकोड माहिती टाकूया (Aiven ची)
const sequelize = new Sequelize(
  "defaultdb", 
  "avnadmin", 
  "AVNS_wss1Nhd4UmN4QhLGFWg", 
  {
    host: "mysql-78a2a13-pranaykalekar20-bce1.f.aivencloud.com",
    port: 13916,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false // Aiven साठी हे खूप महत्त्वाचं आहे
      }
    },
    timezone: "+05:30"
  }
);

// ३. शेवटी एक्सपोर्ट करा
module.exports = sequelize;