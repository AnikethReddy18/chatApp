import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../apiClient"

function Chat() {
  const { username } = useParams();
  const [receiver_id, setReceiverId] = useState()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    async function getMessages(){
      const userResponse = await apiClient.get("/user/"+username)
      const id = userResponse.data.id
      setReceiverId(id)

      const response = await apiClient.get("/message", {
        headers: { Authorization: "Bearer " + localStorage.getItem('token') },
        params: {receiver_id: id}
      } )
      
      setMessages(response.data)
    }

    getMessages()
  },[])

  async function sendMessage(e){
    e.preventDefault()

    await apiClient.post("/message", {receiver_id, content: message}, {
      headers: {Authorization: "Bearer " + localStorage.getItem('token') ,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    window.location.reload()
  }

  return (
  <>
  <div>Chatting with {username}</div>

  <div>
    {messages.map((message, index)=>{
     const color = message.sender_id == localStorage.getItem('id') ? "blue" : "red"
     const textAlign =  message.sender_id == localStorage.getItem('id') ? "right" : "left"
     return <div key={index} style={{color, textAlign}}>{message.content}</div>
    })}

    <form onSubmit={sendMessage}>
      <input type="text" name="message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
      <button>Send!</button>
    </form>
  </div>
  </>);
}

export default Chat