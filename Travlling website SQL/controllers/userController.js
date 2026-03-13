const User = require("../models/User");

exports.registerUser = async (req,res)=>{
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch(err){
    res.status(500).json({error: err.message});
  }
};

exports.loginUser = async (req,res)=>{
  const { email, password } = req.body;

  const user = await User.findOne({ where:{ email } });

  if(!user){
    return res.json({msg:"User not found"});
  }

  if(user.password !== password){
    return res.json({msg:"Wrong password"});
  }

  res.json({
  msg:"Login success",
  role: user.role,
  name: user.name   // 👈 add this
});

};



// ॲडमिनचा पासवर्ड आणि ईमेल अपडेट करण्यासाठी
exports.updateAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // डेटाबेसमधून ॲडमिनला शोधणे
    const admin = await User.findOne({ where: { role: 'admin' } });

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    // नवीन ईमेल टाकला असेल तर अपडेट कर
    if (email && email.trim() !== "") {
      admin.email = email;
    }
    
    // नवीन पासवर्ड अपडेट कर
    if (password && password.trim() !== "") {
      admin.password = password;
    }

    await admin.save(); // डेटाबेसमध्ये सेव्ह करा
    res.json({ msg: "Admin credentials updated!" });

  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};
