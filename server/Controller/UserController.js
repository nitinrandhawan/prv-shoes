const User = require("../Model/UserModel");
// var passwordValidator = require('password-validator');
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");

// Create a schema
// var schema = new passwordValidator();

// // Add properties to it
// schema
//     .is().min(6)
//     .is().max(10)
//     .has().uppercase()
//     .has().lowercase()
//     .has().digits(1)
//     .has().symbols(1)
//     .has().not().spaces()
//     .is().not().oneOf(['Passw0rd', 'Password123']);

exports.newRegister = async (req, res) => {
  let data = new User(req.body);
  bcrypt.hash(req.body.password, 12, async (error, hash) => {
    if (error)
      res.status(500).json({
        mess: "Internal Server Error in hashing",
      });
    else {
      data.password = hash;
      try {
        await data.save();
        res.status(200).json({
          success: true,
          mess: "Record created",
        });
        await sendEmail({
          email: data.email,
          subject: "Welcome to our Shop",
          message: "Thank you for registering with us!",
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          mess: "Internal Server Error",
        });
      }
    }
  });
};

exports.verifyAdminRole = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: "Admin Loggedin Successfully",
    });
  } catch (error) {
    console.log("error", error);
    
    res.status(500).json({
      success: false,
      mess: "Internal Server Error",
    });
  }
};
exports.login = async (req, res) => {
  try {
    console.log(req.body.userName);
    let data = await User.findOne({
      $or: [{ userName: req.body.userName }, { email: req.body.userName }],
    });
    console.log("data", data);

    if (data && (await bcrypt.compare(req.body.password, data.password))) {
      let key =
        data.role == "Admin"
          ? process.env.JWT_SALT_KEY_ADMIN
          : process.env.JWT_SALT_KEY_BUYER;
      jwt.sign({ data }, key, { expiresIn: 1296000 }, (error, token) => {
        if (error)
          res.send({
            status: 500,
            result: "Fail",
            message: "Internal Server Error",
          });
        else {
          res.status(200).json({
            result: "Done",
            data: {
              _id: data._id,
              userName: data.userName,
              email: data.email,
              role: data.role,
            },
            token: token,
          });
        }
      });
    } else
      res.status(401).json({
        success: false,
        mess: "Invailid Username or password",
      });
  } catch (error) {
    console.log("error", error);

    res.status(500).json({
      success: false,
      mess: "Internal Server Error",
    });
  }
};

exports.getByUserId = async (req, res) => {
  try {
    let userDetails = await User.findOne({ _id: req.params._id });
    res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      mess: "Internal Server Error",
    });
  }
};
