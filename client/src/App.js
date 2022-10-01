import io from "socket.io-client";
import { useState, useEffect } from "react";
import Chat from "./components/Chat";

const socket = io.connect("https://chatapp-server.up.railway.app", {
  transports: ["websocket"],
});

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const joinRoom = () => {
      socket.emit("join_room", room);
    };
    joinRoom();
  }, [room]);

  return (
    <div className="App flex justify-center items-center h-screen bg-gradient-to-r from-slate-100 to-blue-100">
      <div className="border-2 border-slate-400 rounded-md p-3 bg-white">
        <div>
          <label>Name</label>
          <input
            className={`border m-2 p-1 px-2 rounded-md ${
              username === "" ? "border-rose-800/50" : null
            }`}
            type="text"
            placeholder="Name.."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Room</label>
          <input
            className="border m-2 p-1 px-2 rounded-md"
            type="text"
            placeholder="Room.."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
        </div>
        <Chat socket={socket} username={username} room={room} />
      </div>
    </div>
  );
}

export default App;
