const Lead = require("../models/Lead");
const sequelize = require("../config/sql");

// CREATE (user form)
exports.createLead = async (req,res)=>{
  const data = await Lead.create(req.body);
  res.json(data);
};

// GET ALL (admin)
exports.getLeads = async (req,res)=>{
  res.json(await Lead.findAll());
};

// UPDATE STATUS
exports.updateLead = async (req,res)=>{
  await Lead.update(
    { status: req.body.status },
    { where: { id: req.params.id } }
  );
  res.json({msg:"Updated"});
};

// DELETE
exports.deleteLead = async (req,res)=>{

  await Lead.destroy({
    where: { id: req.params.id }
  });

  // 👉 count check कर
  const count = await Lead.count();

  // 👉 जर table empty असेल तर reset
  if(count === 0){
    await sequelize.query("ALTER TABLE Leads AUTO_INCREMENT = 1");
  }

  res.json({msg:"Deleted"});
};
