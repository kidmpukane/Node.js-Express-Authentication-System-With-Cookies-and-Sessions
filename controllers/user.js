//Authentication App
const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.createUser = async(req, res) => {
    const {fullname, email, password} = req.body
    const isNewUser = await User.isThisEmailInUse(email);
    if(!isNewUser)
    return res.json({
        success: false,
        message: "This email is in use try to login or try using another"
    });    
    const user =  await User({
        fullname,
        email,
        password,
      });
     await user.save();
    res.json(user);
};

exports.userSignIn = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    if(!user) return res.json({
        success: false, message: "User not found"
    })

   const ifmatch = await user.comparePasswords(password)
   if(!Match) return res.json({
       success: false, message:"email and password do not match"
   })

   jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
       expiresIn: "1d"
   })
   
   res.json({success: true, user});
};