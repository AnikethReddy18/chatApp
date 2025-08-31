import jwt from "jsonwebtoken"

export function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"]

    if (typeof (bearerHeader) === "undefined") return res.sendStatus(403)

    const bearer = bearerHeader.split(' ')
    const token = bearer[1]

    jwt.verify(token, process.env.SECRET_KEY, (err, authData) => {
        if (err) return res.status(403).json({ error: "Token Error" })

        req.user = authData
        next()
    })
}

export function verifyTokenWS(socket, next) {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error("No Token Found"));
    jwt.verify(token, process.env.SECRET_KEY, (err, authData) => {
        if (err) return next(new Error("Token Error"))
        socket.user = authData
        next();
    })
}
