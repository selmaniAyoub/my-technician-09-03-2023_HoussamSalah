import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";
import ForumComponent from '../../components/Admin/Forum/Forum';
import SockJsClient from "react-stomp";

const PersonnelForum = ({ system, room }) => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastMessage, setLastMessage] = useState({});
  const [chatRoom, setChatRoom] = useState("");

  const clientRef = useRef(null);

  useEffect(() => {
    if (system.user) {
      const { user } = system;
      const role = user?.roles[0]?.role;

      if (room && role === "admin") {
        setChatRoom(room);
        axios
          .get(`http://localhost:5000/search/admin/messages/${room}s`)
          .then((res) => {
            if (res.data) {
              setMessages(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (!room && role !== "admin") {
        setChatRoom(role);
        axios
          .get(`http://localhost:5000/search/user/message/${user.id}`)
          .then((res) => {
            if (res.data) {
              setMessages(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [room, system]);

  const sendMessage = (msg) => {
    try {
      setLastMessage(msg);
      console.log(msg)
      console.log(chatRoom)
      console.log(clientRef)
      console.log(clientRef.current)
      clientRef.current.sendMessage(`chat/${chatRoom}s`, JSON.stringify(msg));
   
    } catch (e) {
      console.log(e);
    }
  };

  const onMessageReceive = (msg, topic) => {
    setMessages([...messages, msg]);
    if (lastMessage.username === msg.username) {
      setLoading(false);
    }
  };

  const handleRemove = (message) => {
    const newArr = messages.filter((e) => e.id !== message.id);
    setMessages(newArr);
  };

  return (
    <>
      <ForumComponent
        handleRemove={handleRemove}
        room={room}
        messages={messages}
        sendMessage={sendMessage}
        connected={connected}
        setLoading={setLoading}
        loading={loading}
      />
      {chatRoom.trim().length > 0 ? (
        <SockJsClient
          url="http://localhost:5000/chat"
          topics={[`/topic/messages/${chatRoom}s`]}
          onMessage={onMessageReceive}
          ref={clientRef}
          onConnect={() => {
            setConnected(true);
          }}
          onDisconnect={() => {
            setConnected(false);
          }}
          onConnectFailure={(err) => console.log(err)}
          debug={false}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  system: state.system,
});

export default connect(mapStateToProps)(PersonnelForum)
