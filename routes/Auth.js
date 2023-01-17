const router = require('express').Router()
const User = require('../models/User')
const Chat = require('../models/Chat')
const bcrypt = require("bcrypt")

router.post("/", async(req, res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    const body = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
        name: req.body.username
    })
    try{
        const newUser = await body.save();
        res.status(200).json(newUser)
    }catch(err){
        res.status(404).json(err)
    }
})
router.get("/chat/:id", async(req, res)=>{
    try{
        const newUser = await Chat.findById(req.params.id);
        res.status(200).json(newUser)
    }catch(err){
        res.status(404).json(err)
    }
})
router.get("/getchat", async(req, res)=>{
    const body = [ req.headers.id, req.headers.idd]
    const body2 = [ req.headers.idd, req.headers.id]
    const status = true;
    try{
        const newChat = await Chat.find({users: body});
        const newChatt = await Chat.find({users: body2});

        console.log(newChat)
        console.log(newChatt)

        if(newChat.length === 0 && newChatt.length === 0) res.status(200).json(true)
        if(newChat.length !== 0 || newChatt.length !== 0) res.status(200).json(false)

        // if(newChat.length !== 0 || newChatt.length  !== 0){
        //     res.status(200).json(status)
        // }else{
        //     status = false;
        //     res.status(200).json(status)
        // }
    }catch(err){
        console.log(err.message)
    }
})

router.post("/login", async(req, res)=>{
    try{
        const userDB = await User.findOne({username: req.body.username})
        !userDB && (res.status(404).json("Nenhum usuário registrado com este nome"))

        if(userDB){
           const verificarSenha = await bcrypt.compare(req.body.password, userDB.password)

            verificarSenha ? (res.status(200).json(userDB)) : (res.status(400).json("Senha incorreta"))
        }
    }catch(err){
        res.status(404).json(err)
    }
})
router.put("/:id", async(req, res)=>{
    const id = req.params.id;
    const novo_user = req.body;
    if(novo_user.userId === id){
        
        try{
            const updateUser = await User.findByIdAndUpdate(id, {
                $set: novo_user
            });
            res.json({error: false, updateUser});
        }catch(err){
            res.json({error: true, message: err.message});
        }
    }else{
        res.status(401).json("tu só podes atualizar a sua conta");
    }
})

router.get("/", async(req, res)=>{
    const preferenca = req.headers.preferenca
    try{
        const users = await User.find({
            genero: preferenca
        })
        res.status(200).json(users)
    }catch(err){
        res.status(404).json(err)
    }
})
router.get("/:id", async(req, res)=>{
    try{
        const users = await User.findById(req.params.id)
        res.status(200).json(users)
    }catch(err){
        res.status(404).json(err)
    }
})
router.get("/match/:id", async(req, res)=>{
    const whoId = req.params.id
    const userid = req.headers.userid

    try{
        const whoUser = await User.findById(whoId)
        const IUser = await User.findById(userid)

        var liked = await IUser.like.find((id)=> id === whoId)
        if(liked){
            //criar chat

                var newChat = null;
                try{
                    const chatBody = new Chat({
                        users: [whoId, userid]
                    })
                    newChat = await chatBody.save()
                }catch(err){
                    res.status(404).json("{message: err.message}")
                }
                const UserObject = {
                    primnone: IUser.primnone,
                    profilePic: IUser.profilePic,
                    id: IUser._id,
                    chat: newChat._id
                }
                const auxWho = [...whoUser.match, UserObject]
                const WhoObject = {
                    primnone: whoUser.primnone,
                    profilePic: whoUser.profilePic,
                    id: whoUser._id,
                    chat: newChat._id
                }
                const auxUser = [...IUser.match, WhoObject]
    
                const matchUser = await User.findByIdAndUpdate(userid, {
                    match: auxUser
                })

                const matchWho = await User.findByIdAndUpdate(whoId, {
                    match: auxWho
                })
                // res.status(200).json(newChat._id)
                res.status(200).json([{"match": true}, matchUser, matchWho])

        }else{

            const check = await whoUser.like.find((id) => id === userid)
            if(check){
                res.status(200).json([{"match": false}, "O seu like já foi registrado!"])
            }else{
                const axi = [...whoUser.like, userid]
                const likedUser = await User.findByIdAndUpdate(whoId, {
                    like: axi
                }, {new:true})
                res.status(200).json([{"match": false}, likedUser])
            }
        }
    }catch(err){
        res.status(404).json("Aqui")
    }
})


module.exports = router;