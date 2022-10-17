import { useEffect, useRef, useState } from "react";
import "./messagesList.scss";

const MessagesLits = (props) => {
  const { user, socket } = props;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  useEffect(()=>{
    loadMessages();
    socket.on("updateAllMessages", () => {
      loadMessages()
    });
  }, []);

  function loadMessages(){
    socket.emit("updateMessages");
  }


  socket.on("updatedMessages", (res) => {
    setMessages((messages) => res);
    setMessagesLoading(false);
  });

  

  const sendMessage = () => {
    socket.emit("sendedMessage", { message, ...user });
    setMessage("");
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <div id="messages_list">
        <div className="messages_container">
          <div className="messages_list">
            {!messagesLoading
              ? messages.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`message ${
                        item.uid === user.uid ? "my-message" : "other-message"
                      }`}
                    >
                      <div className="message-text">{item.message}</div>
                      <div className="message-sender">{item.login}</div>
                    </div>
                  );
                })
              : null}
            <div ref={messagesEndRef} />
          </div>
          <div id="send-form">
            <input
              className="message_area"
              autoComplete="nope"
              type="text"
              name="message"
              placeholder="Введите сообщение"
              value={message}
              onChange={handleMessage}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <input
              className="button_area"
              type="button"
              onClick={sendMessage}
              value="Отправить"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagesLits;
