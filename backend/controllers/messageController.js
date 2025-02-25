import { sendMessage, getMessages } from "../db/queries.js";

export async function sendMessageController(req, res){
    const sender_id = req.user.id
    const {receiver_id, content} = req.body

    if(parseInt(receiver_id) === sender_id) return res.sendStatus(400)

    await sendMessage(sender_id, parseInt(receiver_id),  content)
    res.sendStatus(200)
}

export async function getMessagesController(req, res){
    const sender_id = req.user.id
    const receiver_id = req.query.receiver_id;

    if(receiver_id == undefined) return res.sendStatus(400) 
    if(parseInt(receiver_id) === sender_id) return res.sendStatus(400)

    const data = await getMessages(sender_id, parseInt(receiver_id))
    res.json(data)
}