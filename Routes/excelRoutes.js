const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/excel',(req,res)=>{
    console.log(req.query)
    res.send('hi from excel router')
})


module.exports = router