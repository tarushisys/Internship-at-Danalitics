const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(403).json({
                error: "User not found",
            });
        }

        req.profile = user;
    });
};

exports.getUser = (req, res) => {
    req.proile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updateAt = undefined;

    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate (
        {
            _id: req.profile._id
        },
        {
            $set: req.body
        },
        {
            new: true, userFindAndModify: false
        },
        (err) => {
            if(err) {
                return res.status(400).json({
                    error: "You are not authorised to update information",
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    );
};