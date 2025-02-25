import { getUserByUsername, updateUserPFP } from "../db/queries.js";

export async function getUserDetails(req, res){
    const username = req.params.username

    const user = await getUserByUsername(username)
    res.json(user)
}

export async function updateUserPFPController(req, res){
    const username = req.params.username
    const pfp_url = req.body.pfp_url

    if(username !== req.user.username) return res.sendStatus(400)
    await updateUserPFP(parseInt(req.user.id), pfp_url)

    res.sendStatus(200)
}