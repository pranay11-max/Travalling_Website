const Package = require("../models/Package");
const sequelize = require("../config/sql");
// const { Package } = require('../models'); 

// ADD
exports.addPackage = async (req,res)=>{
  const data = await Package.create(req.body);
  res.json(data);
};

// GET ALL
exports.getPackages = async (req,res)=>{
  res.json(await Package.findAll());
};

// UPDATE
exports.updatePackage = async (req,res)=>{
  await Package.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({msg:"Updated"});
};

// DELETE
exports.deletePackage = async (req,res)=>{
  await Package.destroy({
    where: { id: req.params.id }
  });

  const count = await Package.count();

  if(count === 0){
    await sequelize.query("ALTER TABLE Packages AUTO_INCREMENT = 1");
  }

  res.json({msg:"Deleted"});
};

// GET SINGLE
exports.getOne = async (req,res)=>{
  const data = await Package.findByPk(req.params.id);

  if(!data){
    return res.status(404).json({msg:"Not found"});
  }

  res.json(data);
};






// packageController.js
exports.getPackages = async (req, res) => {
    try {
        const { category, limit } = req.query;
        let whereClause = {};

        // जर युजरने कॅटेगरी निवडली असेल तरच फिल्टर लावा
        if (category && category !== 'All') {
            whereClause.category = category;
        }

        const packages = await Package.findAll({
            where: whereClause,
            limit: limit ? parseInt(limit) : 100, // होमसाठी ६, एक्सप्लोरसाठी जास्त
            order: [['id', 'DESC']]
        });

        return res.status(200).json(packages);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching data" });
    }
};