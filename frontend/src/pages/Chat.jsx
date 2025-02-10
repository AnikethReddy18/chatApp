import { useParams } from "react-router-dom";

function Chat() {
  const { username } = useParams();

  return <div>Chatting with {username}</div>;
}

export default Chat