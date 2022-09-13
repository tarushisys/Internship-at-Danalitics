const student_Reg=require('../models/student_Reg');
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

//student singup
exports.student_signup = (req, res) => {
  console.log("its working")
    const student_user= new student_Reg(req.body);
   //  console.log(student_user);
    student_user.save((err,student_user)=>{
     if(err){
        return res.status(400).json({
            err :"NOT able to save user in DB"
        });
     }
         res.json({
        name:student_user.name,
        college:student_user.college,
        rollno:student_user.rollno,
        lastname:student_user.lastname,
        email:student_user.email,
        password:student_user.encry_password,
        id:student_user._id
     });
    });
  };
  exports.student_signin = (req, res) => {
   
    const { email, password } = req.body;
 
    student_Reg.findOne({ email }, (err, user) => {
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
      const { _id, name, email } = user;
      return res.json({ token, user: { _id, name, email} });
    });
  };
  
  exports.student_signout = (req, res) => {
    res.clearCookie("token");
    res.json({
      message: "User Signout Successfully",
    });
  };
  ;