// src/components/Welcome.jsx
import { useNavigate } from 'react-router-dom';


export default function Welcome() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-overlay" />
      <h1 className="welcome-title">🎓 Век живи — век учись</h1>
      <p className="welcome-subtitle">Погрузись в увлекательный путь учёного</p>
      <button className="welcome-button" onClick={handleStart}>
        Начать путь
      </button>
    </div>
  );
}
