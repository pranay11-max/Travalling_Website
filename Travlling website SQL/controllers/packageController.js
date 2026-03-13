const Package = require("../models/Package");
const sequelize = require("../config/sql");

// ADD
exports.addPackage = async (req, res) => {
  try {
    const data = await Package.create(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: "Error adding package" });
  }
};

// GET ALL (🚀 इथे आपण 'order_index' ची जादू ॲड केली आहे)
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
            order: [['order_index', 'ASC'], ['id', 'DESC']] // आधी Admin ने ठरवलेला क्रम, मग नवीन आयडी
        });

        return res.status(200).json(packages);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching data" });
    }
};

// UPDATE
exports.updatePackage = async (req, res) => {
  try {
    await Package.update(req.body, {
      where: { id: req.params.id }
    });
    res.json({msg:"Updated"});
  } catch (error) {
    res.status(500).json({ msg: "Error updating package" });
  }
};

// UPDATE SEQUENCE (🚀 हे नवीन फंक्शन पॅकेजेसचा क्रम सेव्ह करेल)
exports.updateSequence = async (req, res) => {
  try {
    const { packages } = req.body; 
    
    // लूप लावून प्रत्येक पॅकेजचा नवीन नंबर डेटाबेसमध्ये सेव्ह करा
    for (let i = 0; i < packages.length; i++) {
      await Package.update(
        { order_index: i },
        { where: { id: packages[i].id } }
      );
    }
    res.json({ msg: "Sequence updated successfully!" });
  } catch (error) {
    console.error("Sequence Error:", error);
    res.status(500).json({ msg: "Error updating sequence" });
  }
};

// DELETE
exports.deletePackage = async (req, res) => {
  try {
    await Package.destroy({
      where: { id: req.params.id }
    });

    const count = await Package.count();

    if(count === 0){
      await sequelize.query("ALTER TABLE Packages AUTO_INCREMENT = 1");
    }

    res.json({msg:"Deleted"});
  } catch (error) {
    res.status(500).json({ msg: "Error deleting package" });
  }
};

// GET SINGLE
exports.getOne = async (req, res) => {
  try {
    const data = await Package.findByPk(req.params.id);

    if(!data){
      return res.status(404).json({msg:"Not found"});
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching package" });
  }
};