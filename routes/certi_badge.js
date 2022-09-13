var express = require("express");
var router = express.Router();
const {
    isSignedIn,
    isAuthenticated,
    isAdmin,
    notAdnime,
} = require("../controller/auth");

const { getUserById, getUser} = require("../controller/user");
const{
    addCertiToUser,
    download_certi,
    show_badge,
} = require("../controller/certi_badge");

router.param("userId", getUserById);
router.post(
    "/addCerti/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    addCertiToUser
);

router.get(
    "/downloadCerti/:userId",
    isSignedIn,
    isAuthenticated,
    notAdmin,
    download_certi
);

router.get(
    "/showbadge/:userId",
    isSignedIn,
    isAuthenticated,
    notAdmin,
    show_badge
);

module.exports = router;