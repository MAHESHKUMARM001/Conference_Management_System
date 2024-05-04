const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
         
    },
    Password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("registeredusers", schema);

