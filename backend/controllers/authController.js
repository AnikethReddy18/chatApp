import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"

import {createUser, getUserByUsername} from "../db/queries.js"

export const signupValidatiors = [
    body("username").isLength({min: 6}).withMessage("Username must have 6 characters atleast"),
    body("password").isLength({min: 6}).withMessage("Password must have 6 characters atleats")
]

export async function signupController(req, res){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const user = await getUserByUsername(req.body.username)
    if(user) return res.status(400).json({errors: ["Username is already in use"]})
    
    const { username, password, first_name, last_name } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    await createUser(username, hashedPassword, first_name, last_name)   
    res.sendStatus(200) 
}

export async function loginController(req, res){
    const {username, password} = req.body
    if(!username || !password) return res.sendStatus(401) 

    const user = await getUserByUsername(username)
    if(!user) return res.status(401).json({error: "Username does not exist"})

    const verified = bcrypt.compareSync(password, user.password)
    if(!verified) return res.status(401).json({error: "Wrong password"})

    jwt.sign(user, process.env.SECRET_KEY, (err, token)=>{
        res.json({token , ...user})
    })
}

