const Sms = require('../models/Sms')

const router = require('express').Router()

router.get("/", async(req, res)=>{
    try {
        const allSms = await Sms.find()
        res.status(200).json(allSms)
    } catch (error) {
        res.status(200).json(error)
    }
})
router.get("/:id", async(req, res)=>{
    try {
        const allSms = await Sms.find({chatId: req.params.id})
        res.status(200).json(allSms)
    } catch (error) {
        res.status(200).json(error)
    }
})
router.post("/", async(req, res)=>{
    const objectSms = new Sms({
        sms: req.body.sms,
        author:req.body.author,
        chatId: req.body.chatId 
    })
    try {
        const newSms = await objectSms.save()
        res.status(200).json(newSms)
    } catch (error) {
        res.status(200).json(error) 
    }
})
router.put("/:id", async(req, res)=>{
    const id =  req.params.id
    try {
        const newSms = await Sms.findByIdAndUpdate(id, {
            sms: req.body.sms
        })
        res.status(200).json(newSms)
    } catch (error) {
        res.status(200).json(error) 
    }
})
router.delete("/:id", async(req, res)=>{
    const id =  req.params.id
    try {
        await Sms.findByIdAndDelete(id)
        res.status(200).json("Deletado com sucesso!")
    } catch (error) {
        res.status(200).json(error) 
    }
})

module.exports = router;