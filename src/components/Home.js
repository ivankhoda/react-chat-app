import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { socket } from "../service/socket";

export function Home() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("1");

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
    localStorage.setItem("username", username);
    localStorage.setItem("room", room);
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
            <select className="form-select" aria-label="Default select example" onChange={handleChangeRoom} required>
              <option value="1" id="1">
                Room 1
              </option>
              <option value="2" id="2">
                Room 2
              </option>
              <option value="3" id="3">
                Room 3
              </option>
            </select>
          </div>

          <Link to="/chat" className="btn btn-primary" onClick={handleSubmit}>
            Join chat
          </Link>
        </form>
      </div>
    </div>
  );
}
