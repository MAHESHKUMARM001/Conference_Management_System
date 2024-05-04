const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Link : {
        type:String,
        required: true
    },
    Status : {
        type:String,
        required: true
    }
});

module.exports = mongoose.model("documents", documentSchema);
