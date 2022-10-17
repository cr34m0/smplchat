import "./App.scss";
import OnlineUsers from "./components/onlineUsers/onlineUsers";
import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";
import RegisterForm from "./components/registerForm/registerForm";
import MessagesLits from "./components/messagesList/messagesList";
const socket = socketIOClient(process.env.ENDPOINT);

const App = () => {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);
  const [isUserRegistered, setUserRegistered] = useState(false);

  useEffect(() => {
    document.title = "Simple Chat";
    socket.on("userRegistered", (res) => {
      setUser(res.login);
      setUid(res.uid);
      setUserRegistered(true);
    });
  }, []);

  return (
    <div className="App">
      {!isUserRegistered ? <RegisterForm socket={socket} /> : null}
      <div className="app-body">
        <OnlineUsers socket={socket} />
        <MessagesLits socket={socket} user={{ user, uid }} />
      </div>
      <div className="bg"></div>
    </div>
  );
};

export default App;
