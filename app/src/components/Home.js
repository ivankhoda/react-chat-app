import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { socket } from "../service/socket";

export function Home() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  //Set history to let Link submit from and redirect
  let history = useHistory();

  const handleChangeName = (e) => {
    setUsername(e.target.value);
  };
  const handleChangeRoom = (e) => {
    setRoom(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("joinRoom", { username, room });
    history.push({ pathname: "/chat", search: `room=${room}` });
  };
  return (
    <div className="App">
      <div className="container container_main">
        <form className="row row-cols-1" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User name</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter username..."
              required
              onInput={handleChangeName}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Room</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter username..."
              aria-label="Default select example"
              onChange={handleChangeRoom}
              required
            ></input>
          </div>

          <Link to={`/chat?name=${username}&room=${room}`} className="btn btn-primary" onClick={handleSubmit}>
            Join chat
          </Link>
        </form>
      </div>
    </div>
  );
}
