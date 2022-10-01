import React, { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ socket, username, room }) {
  const [currMess, setCurrMess] = useState("");
  const [messList, setMessList] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessList((list) => [...list, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (username === "") {
      alert("you must enter username");
      return;
    }
    if (currMess !== "") {
      const messData = {
        room: room,
        author: username,
        message: currMess,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messData);
      setMessList((list) => [...list, messData]);
      setCurrMess("");
    }
  };
  return (
    <div className="border p-2 mt-2">
      <ScrollToBottom className="message-container">
        {messList.map((messContent, index) => {
          return (
            <div
              key={index}
              className={`flex max-w-xs ${
                messContent.author === username
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div className="m-1">
                {messContent.author !== username ? (
                  <div className="text-xs flex">
                    <div className="mr-1"> {messContent.author} </div>
                    <div className="text-gray-400">{messContent.time}</div>
                  </div>
                ) : null}
                <div
                  className={`break-words border w-fit p-1 px-3 rounded-lg text-white ${
                    messContent.author === username
                      ? "bg-blue-500"
                      : "bg-slate-500"
                  }`}
                >
                  {messContent.message}
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
      <div className="flex justify-center">
        <div className="">
          <input
            className="border m-2 p-1 w-full rounded-l-md"
            value={currMess}
            type="text"
            onChange={(e) => {
              setCurrMess(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
        </div>
        <div className="">
          <button
            className="border m-2 p-1 px-3 rounded-r-md bg-slate-200"
            onClick={sendMessage}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}
