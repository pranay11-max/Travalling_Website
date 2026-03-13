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

