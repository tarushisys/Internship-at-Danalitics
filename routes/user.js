var express = require("express");
var router = express.Router;

const { getUserById, getUser, updateUser } = require("../controller/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controller/auth");

router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;