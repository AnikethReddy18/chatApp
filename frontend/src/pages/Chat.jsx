import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import apiClient from "../apiClient";
import { Link } from "react-router-dom";
import socket from '../socket.js'

function Chat() {
  const { username } = useParams();
  const [sender_id, setSenderId] = useState()
  const [receiver_id, setReceiverId] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [otherPfp, setOtherPfp] = useState('')

  const scrollHelp = useRef(null);

  useEffect(() => {
    async function getData() {
      const userResponse = await apiClient.get("/user/" + username);
      const id = userResponse.data.id;
      setReceiverId(id);
      const senderID = localStorage.getItem('id')
      setSenderId(senderID)
      setOtherPfp(userResponse.data.pfp_url)
      const response = await apiClient.get("/message", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        params: { receiver_id: id },

      });

      setMessages(response.data);
      socket.emit('joinRoom', { receiver_id: id, sender_id: senderID })
    }

    getData();
    socket.on('newMessage', (data) => {
      setMessages((prev) => [...prev, data])
    });

    return () => socket.off('newMessage')
  }, []);

  useEffect(() => scrollHelp.current.scrollIntoView({ block: 'end' }), [messages])

  async function sendMessage(e) {
    e.preventDefault();

    await apiClient.post(
      "/message",
      { receiver_id, content: message },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    socket.emit(('sendMessage'), { sender_id, receiver_id, message })
    setMessage("")
  }

  return (
    <div className="chat-container">
      <h2>Chatting with {username}</h2>
      <Link to="/home" className="link">Home</Link>

      <div className="messages" >
        {messages.map((msg, index) => {
          const isUser = msg.sender_id == localStorage.getItem("id");
          const className = isUser ? "message user" : "message other";
          const imgSrc = isUser ? localStorage.getItem('pfp_url') : otherPfp;

          return (
            <div key={index} className={className}>
              <img src={imgSrc} alt="User" />
              <span>{msg.content}</span>
            </div>
          );
        })}

        <div ref={scrollHelp} />
      </div>

      <form className="chat-input" onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
