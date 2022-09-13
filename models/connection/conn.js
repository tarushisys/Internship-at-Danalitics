const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Certificate_Development").then(()=>{
    console.log("DB IS CONNECTED")
}).catch((err)=>{
    console.log(err);
});


