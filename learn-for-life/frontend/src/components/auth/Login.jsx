import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Keep this for direct navigation if needed elsewhere
import { useWipe } from "../WipeContext"; // Import useWipe
import "./Login.css";



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Still useful for general navigation
  const { wipeNavigate } = useWipe(); // Get wipeNavigate from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        wipeNavigate("/game"); // Use wipeNavigate here
      } else {
        alert("Ошибка входа: " + data.detail || "Неверные данные");
      }
    } catch (err) {
      console.error(err);
      alert("Сервер недоступен");
    }
  };

  return (
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
        <p>
          Нет аккаунта? <a href="/register">Зарегистрироваться</a>
        </p>
        {/* If you want to navigate back to welcome with wipe, add a button/link here */}
        {/* <button onClick={() => wipeNavigate('/')}>Back to Welcome</button> */}
      </form>
    </div>
  );
}

export default Login;