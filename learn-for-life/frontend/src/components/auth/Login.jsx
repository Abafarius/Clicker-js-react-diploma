import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWipe } from "../WipeContext";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stars, setStars] = useState([]);
  const navigate = useNavigate();
  const { wipeNavigate } = useWipe();

  useEffect(() => {
    const starElements = [];
    for (let i = 0; i < 150; i++) {
      const size = Math.random() * 2 + 1;
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${Math.random() * 2}s`,
      };
      starElements.push(<div className="star" style={style} key={i} />);
    }
    setStars(starElements);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        wipeNavigate("/game");
      } else {
        alert("Ошибка входа: " + (data.detail || "Неверные данные"));
      }
    } catch (err) {
      console.error(err);
      alert("Сервер недоступен");
    }
  };

  return (
    <div className="login-page">
      <div className="starfield">{stars}</div>
      <div className="login-container">
        <h2>Вход</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Войти</button>
          <p className="auth-switch">
            Нет аккаунта?{" "}
            <span
              className="auth-link"
              onClick={() => wipeNavigate("/register")}
            >
              Зарегистрироваться
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
