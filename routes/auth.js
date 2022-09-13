var express = require("express");
var router = express.Router();

const {
  student_signup,
  student_signin,
  isSigned,
} = require("../controller/student_reg");



router.post("/signup", signup);

router.post("/admin_signin", admin_signin);

router.get("/signout", signout);

module.exports = router;
