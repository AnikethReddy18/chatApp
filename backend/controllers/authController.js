import bcrypt from "bcrypt"
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

export function loginController(req, res){
    res.send("Hello World!")
}

