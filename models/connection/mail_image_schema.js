var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
      },
      
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = new mongoose.model('Image', imageSchema);
