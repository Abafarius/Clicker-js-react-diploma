import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SceneWipeTransition from './SceneWipeTransition';

const WipeContext = createContext();

export const useWipe = () => useContext(WipeContext);

export const WipeProvider = ({ children }) => {
  const navigate = useNavigate();
  const [wipeActive, setWipeActive] = useState(false);

  const wipeNavigate = (path) => {
    setWipeActive(true); // Активируем анимацию перехода
    
    // Ждем, пока анимация перехода достаточно закроет экран
    setTimeout(() => {
      navigate(path); // После этого переходим на новую страницу
    }, 600); // Примерно половина от 1300ms, когда экран уже закрыт вайпом

    // Ждем завершения всей анимации, чтобы затем деактивировать вайп
    setTimeout(() => {
      setWipeActive(false); // Деактивируем вайп после завершения анимации
    }, 1300); // Общая длительность анимации
  };

  return (
    <WipeContext.Provider value={{ wipeNavigate }}>
      <SceneWipeTransition trigger={wipeActive} />
      {children}
    </WipeContext.Provider>
  );
};