var mongoose = require("mongoose");

var certiSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },

        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },

        certificate: {
            data: Buffer,
            contentType: String
        },

        badge: {
            type: Number,
            default: 1
        }
    },

    { timeStamps: true}
);

module.exports = mongoose.model("certi", certiSchema);