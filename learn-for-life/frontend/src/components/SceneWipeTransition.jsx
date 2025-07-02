import React, { useEffect, useState } from "react";

const SceneWipeTransition = ({ trigger }) => {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      setActive(true);

      // Снимаем active через 1300 мс
      const deactivate = setTimeout(() => setActive(false), 1300);

      // Удаляем сцену после окончания анимации + запас
      const hide = setTimeout(() => setVisible(false), 1600);

      return () => {
        clearTimeout(deactivate);
        clearTimeout(hide);
      };
    }
  }, [trigger]);

  if (!visible) return null;

  return (
    <div className={`scene-wipe-container ${active ? "active" : ""}`}>
      <div className="scene-wipe left" />
      <div className="scene-wipe right" />
    </div>
  );
};

export default SceneWipeTransition;
