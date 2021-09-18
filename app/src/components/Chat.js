import queryString from "query-string";
import { useEffect, useState } from "react";
import { socket } from "../service/socket";
import { ChatLink, CustomButton, Message, User } from "./utils/index";

export function Chat() {
  let [username, setUsername] = useState("");
  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  //const room = localStorage.getItem("room");

  function getLink() {
    const string = window.location.href;

    const roomNumber = string.substring(string.indexOf("&"));
    const link = `${roomNumber}`;
    return link;
  }
  let linkToChat = getLink();

  //Get information about recieved messages and users in room
  useEffect(() => {
    const { username, room } = queryString.parse(window.location.search);
    setRoom(room);
    setUsername(username);

    function receivedMessage(message) {
      setMessages([...messages, message]);
    }
    socket.on("message", (message) => {
      receivedMessage(message);
    });
    //Cancel subscribe. Solved problem of "timeout violation" and stucking messages.
    return () => {
      socket.off("message");
    };
  }, [messages]);

  socket.on("roomUsers", ({ room, users }) => {
    setUsers(users);
    setRoom(room);
  });

  function sendMessage(e) {
    e.preventDefault();

    socket.emit("chatMessage", message);

    e.target.reset();
  }
  function handleChange(e) {
    setMessage(e.target.value);
  }

  const Room = (room) => {
    return <h2 id="room-name">{room.room}</h2>;
  };

  return users.length !== 0 ? (
    <div className="App">
      <div className="container">
        <header className="row row-cols-2 border-bottom">
          <h2 className="flex-grow-1">Chat</h2>
          <CustomButton name={"Quit"} />
        </header>
      </div>
      <div className="container">
        <div className="row row-cols-1">
          <div className="row">
            <div className="col col-2">
              <aside>
                <h3>Room Name:</h3>
                <Room room={room} />
                <ul className="list-group list-group-flush">
                  Users:
                  {users.map((user, index) => {
                    return <User key={index} user={user} />;
                  })}
                </ul>
              </aside>
            </div>
            <div className="col chat_messages overflow-auto d-flex flex-column">
              {messages.map((message, index) => {
                return <Message key={index} message={message} />;
              })}
            </div>
          </div>
          <form id="chat-form" className="input-group mb-3" onSubmit={sendMessage}>
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autoComplete="off"
              className="form-control flex-grow-2"
              onChange={handleChange}
            />
            <button className="btn btn-primary col-1 justify-self-end">Send</button>
          </form>
        </div>
        <ChatLink link={linkToChat} />
      </div>
    </div>
  ) : (
    <div className="App">
      <div className="container">
        <h2 className="flex-grow-1">Please go to Main page to input your name and select room</h2>
        <CustomButton name={"Go to Main"} />
      </div>
    </div>
  );
}
