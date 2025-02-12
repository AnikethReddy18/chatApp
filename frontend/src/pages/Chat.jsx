import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../apiClient";
import { Link } from "react-router-dom";

function Chat() {
  const { username } = useParams();
  const [receiver_id, setReceiverId] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getMessages() {
      const userResponse = await apiClient.get("/user/" + username);
      const id = userResponse.data.id;
      setReceiverId(id);

      const response = await apiClient.get("/message", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        params: { receiver_id: id },
      });

      setMessages(response.data);
    }

    getMessages();
  }, []);

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

    window.location.reload();
  }

  return (
    <div className="chat-container">
      <h2>Chatting with {username}</h2>
      <Link to="/home" className="link">Home</Link>

      <div className="messages">
        {messages.map((msg, index) => {
          const isUser = msg.sender_id == localStorage.getItem("id");
          const className = isUser ? "message user" : "message other";
          const imgSrc = "https://pbs.twimg.com/profile_images/1725186602832723968/QG5V9M0Q_400x400.jpg";

          return (
            <div key={index} className={className}>
              <img src={imgSrc} alt="User" />
              <span>{msg.content}</span>
            </div>
          );
        })}
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
