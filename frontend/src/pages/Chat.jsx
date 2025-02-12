import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../apiClient"

function Chat() {
  const { username } = useParams();
  const [messages, setMessages] = useState([])

  useEffect(()=>{
    async function getMessages(){
      const userResponse = await apiClient.get("/user/"+username)
      const receiver_id = userResponse.data.id

      const response = await apiClient.get("/message", {
        headers: {Authorization: "Bearer " + localStorage.getItem('token')},
        params: {receiver_id}
      } )
      console.log(response.data)
    }

    getMessages()
  },[])

  return (
  <>
  <div>Chatting with {username}</div>


  </>);
}

export default Chat