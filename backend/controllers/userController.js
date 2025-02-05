import { getUserByUsername, updateUser } from "../db/queries.js";

export async function getUserDetails(req, res){
    const username = req.params.username

    const user = await getUserByUsername(username)
    res.json(user)
}

export async function updateUserDetails(req, res){
    const username = req.params.username
    const {first_name, last_name, pfp_url} = req.body

    if(username !== req.user.username) return res.sendStatus(400)
    await updateUser(parseInt(req.user.id), first_name, last_name, pfp_url)

    res.sendStatus(200)
}