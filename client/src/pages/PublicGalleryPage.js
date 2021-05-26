import { useEffect, useState, useRef } from "react";
import API from "../util/API";
// import socketClient from "socket.io-client";
import { io } from "socket.io-client";
import { useImmer } from "use-immer";
const SERVER = "http://localhost:3000";

function Gallery() {
  const [chat, setChat] = useImmer([]);
  const textEl = useRef(null);
  const usernameEl = useRef(null);
  // var socket = socketClient(SERVER, {
  //   autoConnect: false
  // });

  const socket = io(SERVER, {
    autoConnect: false
  })
  // const socket = io.connect(SERVER);

  const onMessage = () => {
    var username = usernameEl.current.value;
    var message = textEl.current.value;
    socket.emit("private_chat", {
      to: username,
      message: message
    })
  }



  const onPageLoad = () => {
    API.getUser().then((res) => {
      const username = res.data.username;
      socket.emit("register", username);
      socket.connect();
    })
  }

  useEffect(() => {
    onPageLoad();
    return () => socket.disconnect();
  }, [])

  useEffect(() => {
    socket.on("private_chat", function (data) {
      var username = data.username;
      var message = data.message;
      setChat((draft) => {
        draft.push({username,message})
        console.log(chat);
      })
    })
  }, [])

  return (
    <div className="container-fluid portfolio-bg" style={{ marginTop: "50px" }}>
      <input type="text" ref={usernameEl}></input>
      <input type="text" ref={textEl}></input>
      <button onClick={() => onMessage()}>Submit Text</button>
      {chat.map((chatBlock) => (
        <div>
          <div>{chatBlock.username}</div>
          <div>{chatBlock.message}</div>

        </div>
      ))}
    </div>
  );
}
export default Gallery;