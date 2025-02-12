import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../apiClient"
import { Link } from "react-router-dom";

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
    <Link to="/home">Home</Link>
    {messages.map((message, index)=>{
     const isUser = message.sender_id == localStorage.getItem('id')
     const color = isUser ? "blue" : "red"
     const textAlign =  isUser ? "right" : "left"
     const imgSrc = "https://pbs.twimg.com/profile_images/1725186602832723968/QG5V9M0Q_400x400.jpg"

     return <div key={index} style={{color, textAlign}}>
      <img src={imgSrc} alt="" width="32px" />
      <span>{message.content}</span>
     </div>
    })}

    <form onSubmit={sendMessage}>
      <input type="text" name="message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
      <button>Send!</button>
    </form>
  </div>
  </>);
}

export default Chat