import jwt from "jsonwebtoken"

export function verifyToken(req, res, next){
    const bearerHeader = req.headers["authorization"]

    if(typeof(bearerHeader) === "undefined") return res.sendStatus(403)

    const bearer = bearerHeader.split(' ')
    const token = bearer[1]
    
    jwt.verify(token, process.env.SECRET_KEY, (err, authData)=>{
        if(err) return res.status(403).json({error: "Token Error"})

        req.user = authData
        next()    
    })
}