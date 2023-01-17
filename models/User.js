const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    primnone:{
        type:String,
    },
    name:{
        type:String,
    },
    idade:{
        type:Number,
    },
    genero:{
        type:String,
    },
    prefgenero:{
        type:String,
    },
    sobre:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    like:{
        type: [String],
        default: [ ]
    },
    match:{
        type: [Object],
        default: [ ]
    },
    profilePic:{
        type:String,
        default: "https://www.imagensempng.com.br/wp-content/uploads/2021/09/Icone-usuario-Png-1024x1024.png"
    },
    url:{
        type:String,
        default: "https://www.imagensempng.com.br/wp-content/uploads/2021/09/Icone-usuario-Png-1024x1024.png"
    },

},
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);