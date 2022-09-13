const Admin_Reg = require("../models/admin_Reg");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
exports.admin_signup = (req, res) => {
  console.log(req.body);
  const admin_user = new Admin_Reg(req.body);
  admin_user.save((err, admin_user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    res.json({
      college: admin_user.college_name,
      email: admin_user.email,
      password: admin_user.encry_password,
      id: admin_user._id,
    });
  });
};
exports.admin_signin = (req, res) => {
  console.log("its working");
  const { email, password } = req.body;
  Admin_Reg.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "USER email does not exists",
      });
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, "shhhhh");
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, college_name, email } = user;
    return res.json({ token, user: { _id, college_name, email } });
  });
};

exports.admin_signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User Signout Successfully",
  });
};
