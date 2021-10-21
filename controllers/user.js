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

   const isMatch = await user.comparePasswords(password)
   if(!isMatch) return res.json({
       success: false, message:"Email and password do not match any existing user"
   })

   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
   
   const userInfo = {
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar ? user.avatar : '',
  };

  res.json({ success: true, user: userInfo, token });
};