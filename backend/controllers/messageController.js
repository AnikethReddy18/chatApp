import { sendMessage } from "../db/queries.js";

export async function sendMessageController(req, res){
    const sender_id = req.user.id
    const {receiver_id, content} = req.body

    if(parseInt(receiver_id) === sender_id) return res.sendStatus(400)

    await sendMessage(sender_id, parseInt(receiver_id),  content)
    res.sendStatus(200)
}