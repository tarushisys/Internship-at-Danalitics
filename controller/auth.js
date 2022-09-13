const { mongo } = require("mongoose");
const User = require("../models/user");
var jwt = require("jsonwebtoken");
var { expressjwt } = require("express-jwt");

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save the user details",
            });
        }

        res.json({
            name: user.name,
            email: user.enail,
            id: user._id,
        });
    });
};


exports.signin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "This user doesn't exist. Signup first!"
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email or password incorrect!"
            });
        }

        const token = jwt.sign({ _id: user._id }, "shhhhh");

        res.cookie("token", token, { expire: new Date() + 9999 });

        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "user signout successful",
    });
};

exports.isSignedIn = expressjwt({
    secret: "shhhhh",
    algorithms: ["HS256"],
    userProperty: "auth",
});



exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.autj._id;

    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED",
        });
    }

    next();
};

exports.notAdmin = (req, res, next) => {
    if (req.profile.role === 1) {
        return res.status(403).json({
            error: "You are admin",
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not admin, access denied!",
        });
    }
    next();
};