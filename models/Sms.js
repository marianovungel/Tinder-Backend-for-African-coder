const mongoose = require('mongoose');

const SmsSchema = new mongoose.Schema({
    sms:{
        type:String,
        required:true,
        default: " "
    },
    author:{
        type:String,
        required:true,
    },
    chatId:{
        type:String,
        required:true,
    },
    

},
    {timestamps: true}
);

module.exports = mongoose.model("Sms", SmsSchema);