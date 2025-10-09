const generateContent = require("../services/AI.services")

const getResponse = async(req,res)=>{
     
    const code = req.body.code

    if(!code){
        res.status(400).json({message:"Prompt require..."})
    }

    const response = await generateContent(code)

    res.send(response)
}

module.exports= {getResponse}