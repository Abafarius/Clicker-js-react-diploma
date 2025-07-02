import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username || decoded.email || 'Пользователь');
      } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
      }
    }
  }, []);

  return (
    <div className="game-header">
      <h1 className="game-title">🌟 Век живи — век учись</h1>
      {username && <p className="welcome-message">Добро пожаловать, {username}!</p>}
    </div>
  );
};

export default Header;
