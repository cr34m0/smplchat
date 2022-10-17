import { useState } from "react";
import "./registerForm.scss";

const RegisterForm = (props) => {
  const socket = props.socket;
  const [login, setLogin] = useState(null);

  const handleLogin = (event) => {
    setLogin(event.target.value);
  };

  const registerUser = () => {
    socket.emit("register", login);
  };

  return (
    <div id="register_modal">
      <div className="modal-body">
        <div className="modal-body__header">Регистрация</div>
        <div className="modal-body__content">
          <input
            onChange={handleLogin}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                registerUser();
              }
            }}
            type="text"
            placeholder="Введи свой логин"
          />
        </div>
        <div className="modal-body__footer">
          <input
            type="submit"
            onClick={registerUser}
            value="Зарегистрироваться"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
