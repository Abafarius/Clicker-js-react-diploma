import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWipe } from "../WipeContext";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { wipeNavigate } = useWipe();
  const navigate = useNavigate();

  useEffect(() => {
    // Позволяет применить CSS-анимацию появления
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert("Регистрация прошла успешно!");
        wipeNavigate("/login");
      } else {
        const data = await response.json();
        alert("Ошибка: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка сервера");
    }
  };

  return (
    <div className="register-page">
      <div className={`register-container ${isVisible ? "visible" : ""}`}>
        <h2>Регистрация</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Электронная почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Зарегистрироваться</button>
          <p>
            Уже есть аккаунт?{" "}
            <span
              className="link"
              onClick={() => wipeNavigate("/login")}
            >
              Войти
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
