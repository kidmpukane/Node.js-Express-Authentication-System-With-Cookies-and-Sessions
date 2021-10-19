const express = require("express");
const { validationResult } = require("express-validator");

const router = express.Router();
const {createUser, userSignIn} = require("../controllers/user");
const { isAuth } = require("../middleware/auth");
const { validateUserSignUp, userValidation, validateUserSignIn } = require("../middleware/validation/user");

const User = require("../models/user");

const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
if(file.mimetype.startsWith("image")){
    cb(null, true);
}else{
  cb("Unsupported image file, try again", false);
}
}
const uploads = multer({storage, fileFilter: fileFilter})

router.post("/create-user", validateUserSignUp, userValidation,createUser);
router.post("/sign-in", validateUserSignIn, userValidation, userSignIn);
router.post("/upload-profile", isAuth, uploads.single("profile"), async (req, res) =>{
  const {user} = req
    if(!user) return res.status(401).json({success: false, message: "Unauthorized access"});

    try {
      
      const profileBuffer = req.file.buffer
      const {width, height} = await sharp(profileBuffer).metadata()
      const avatar = await sharp(profileBuffer).resize(Math.round(width * 0.5), Math.round(height * 0.5))
      .toBuffer();
  
    await User.findByIdAndUpdate(user._id, {avatar})
      res.status(201).json({success: true, message: "Profile picture updated"})
    } catch (error) {
      res.status(500).json({success: false, message: "Opsy server error profile picture not updated, please try again"})
      console.log("Error while uploading profile picture, please try again", error.message);

    }



});

  module.exports = router;