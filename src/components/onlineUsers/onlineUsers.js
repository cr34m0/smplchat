import { useEffect, useState } from "react";
import "./onlineUsers.scss";

const OnlineUsers = (props) => {
  const socket = props.socket;
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLoggedUsers();

    socket.on("updateAll", () => {
      getLoggedUsers();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const getLoggedUsers = () => {
    socket.emit("getLogged");
  };

  socket.on("users", (res) => {
    setUsers(res);
    setLoading(false);
  });

  return (
    <div id="online-users">
      <div className="users-body">
        <div className="users-body__header">Пользователи Online:</div>
        <div className="users-body__content">
          {!loading ? <UsersList users={users} /> : null}
        </div>
        <div className="users-body__footer"></div>
      </div>
    </div>
  );
};

const UsersList = ({ users }) => {
  return (
    <ul>
      {users.map((item) => {
        return (
          <li key={item.id}>
            <span>⬤</span> {item.login}
          </li>
        );
      })}
    </ul>
  );
};

export default OnlineUsers;
