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

    const user =  await User.create({ fullname, email, password});
    const token = createToken(user._id);
    res.cookie("jwt-cookie", token, {httpOnly: true, maxAge: maxAge * 1000})
    res.json({user: user._id});
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
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

   const maxAge = 3 * 24 * 60 * 60

   const createToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
   
   const userInfo = {
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar ? user.avatar : '',
  };

  res.json({ success: true, user: userInfo, createToken });
};