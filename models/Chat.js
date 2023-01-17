const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    users:{
        type:[String],
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("Chat", ChatSchema);