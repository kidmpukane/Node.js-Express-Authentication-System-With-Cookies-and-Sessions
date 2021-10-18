//Authentication App
const {check, validationResult} = require("express-validator");

exports.validateUserSignUp = [
    check("fullname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name can not be empty")
    .isString()
    .withMessage("Name is invalid")
    .isLength({min: 6, max: 16})
    .withMessage("Name must be within 6 to 16 characters"),
    check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email"),
    check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password can not be empty")
    .isLength({min: 8, max: 20})
    .withMessage("Password must be within 8 to 20 characters"),
    check("confirmPassword").
    trim()
    .not()
    .isEmpty()
    .custom((value, {req})=> {
        if(value !== req.body.password) {
            throw new Error("Passwords do not match")
        }
        return true;
    }),
];

exports.userValidation = (req, res, next) => {
 const result = validationResult(req).array();
 if(!result.length) return next();

 const error = result[0].msg;
 res.json({success: false, message: error});
};

exports.validateUserSignIn = [
    check("email").trim().isEmail().withMessage("email / password is required"),
    check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email / password is required"),
];